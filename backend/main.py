from fastapi import FastAPI, Depends, HTTPException, Cookie, Request, Response, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List

import sqlalchemy.exc
from models import *
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker, Session, joinedload
from sqlalchemy.sql import text
from db import Users, Posts, Comments, Like
from datetime import datetime, timedelta
import redis
import uuid
import sqlalchemy
import os


app = FastAPI()
engine = create_engine("sqlite:///db.db", echo=True)
session = sessionmaker(engine, class_=Session)
redis_client = redis.Redis(host="localhost", port=6379, db=0)


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def get_user_from_session(session_id):
    if not session_id:
        raise HTTPException(status_code=401, detail="You are not authorizated")
    user_id = redis_client.smembers(f"session:{session_id}")
    if user_id:
        user_id = int(list(user_id)[0])
    else:
        raise HTTPException(status_code=401, detail="You are not authorizated")
    return user_id


@app.post("/api/register")
def post_register(request:Register):
    email = request.email
    username = request.username
    password = request.password
    gender = request.gender
    birthday = request.birthday
    if birthday:
        birthday = datetime.strptime(birthday, "%Y-%m-%d")
    with session() as s:
        s:Session
        check_email = s.execute(select(Users).filter(Users.email == email))
        check_email = check_email.scalars().first()
        if check_email:
            raise HTTPException(status_code=409, detail="User already exist!")
        check_username = s.execute(select(Users).filter(Users.username == username))
        check_username = check_username.scalars().first()
        if check_username:
            raise HTTPException(status_code=409, detail="User already exist!")

        user = Users(email=email, username=username, password=password, gender=gender, birthday=birthday)
        s.add(user)
        s.commit()
    raise HTTPException(status_code=200, detail="Registration Succesfull :-D")



@app.post("/api/login")
def post_login(request:Login, response:Response):
    email = request.email
    password = request.password
    with session() as s:
        s:Session
        user = s.execute(select(Users).filter(Users.email == email))
        user = user.scalars().first()
        if not user or user.password != password:
            raise HTTPException(status_code=409, detail="Incorrect login or password.")
    session_id = str(uuid.uuid4())
    redis_client.sadd(f"session:{session_id}", user.id)
    redis_client.expire(f"session:{session_id}", 3600)
    response.set_cookie(key="session_id", value=session_id, max_age=3600, secure=True, httponly=True, samesite="None")

    return {"detail": "Login Successfull!"}


@app.post("/api/logout")
def logout(response:Response, session_id:str=Cookie(None)):
    if not session_id:
        raise HTTPException(status_code=401, detail="You are not authorizated")
    redis_client.delete(f"session:{session_id}")
    response.delete_cookie(key="session_id")
    return {"detail": "Logout Successfull!"}





@app.post("/api/add_post")
def post_register(request:AddPost, session_id:str=Cookie(None)):
    user_id = get_user_from_session(session_id)
    
    title = request.title
    description = request.description
    with session() as s:
        s:Session


        post = Posts(user_id=user_id, title=title, description=description)
        s.add(post)
        s.commit()
    raise HTTPException(status_code=200, detail="Post Created Succesfully!")



@app.post("/api/get_profile")
def post_get_profile(session_id:str=Cookie(None)):
    print(session_id)
    user_id = get_user_from_session(session_id)
    with session() as s:
        s:Session

        user = s.execute(select(Users).filter(Users.id==user_id))
        user = user.scalars().first()
        if not user:
            raise HTTPException(status_code=401, detail="You are not authorizated!")
    result = {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "birthday": user.birthday.strftime("%d.%m.%Y"),
        "gender": user.gender,
        "description": user.description,
        "picture": user.picture
    }
    return result

@app.post("/api/get_profile_other")
def post_get_profile_other(payload:GetOtherProfile):
    username = payload.username
    with session() as s:
        s:Session

        user = s.execute(select(Users).filter(Users.username==username))
        user = user.scalars().first()
        if not user:
            raise HTTPException(status_code=404, detail="That profile doesn't exist!")
    result = {
        "username": user.username,
        "birthday": user.birthday.strftime("%d.%m"),
        "gender": user.gender,
        "description": user.description,
        "picture": user.picture
    }
    return result

@app.get("/api/get_posts")
def get_posts():
    with session() as s:
        s:Session

        stmt = select(Posts).options(joinedload(Posts.many_likes))
        posts_db = s.execute(stmt)
        posts_db = posts_db.unique().all()
        if posts_db:
            posts = []
            for post in posts_db:
                post = post[0]
                stmt = select(Users).where(Users.id == post.user_id)
                user = s.execute(stmt)
                user = user.fetchone() [0]
                print(post.created)
                posts.append({
                    'id': post.id,
                    'title': post.title,
                    'description': post.description,
                    'likes': len(post.many_likes),
                    'author': user.username,
                    'created': datetime.strptime(post.created[:10],"%Y-%m-%d").strftime("%d.%m.%Y")
                })
                post.likes =  len(post.many_likes)
            s.commit()
            return posts
    return []



@app.post("/api/get_post")
def get_post(payload:OnePost):
    try:
        with session() as s:
            s:Session

            stmt = select(Posts).options(joinedload(Posts.many_likes)).where(Posts.id==payload.id)
            posts_db = s.execute(stmt)
            posts_db = posts_db.unique().one()
            if posts_db:
                post = posts_db[0]
                stmt = select(Users).where(Users.id == post.user_id)
                user = s.execute(stmt)
                user = user.fetchone() [0]
                print(post.created)
                data = {
                    'id': post.id,
                    'title': post.title,
                    'description': post.description,
                    'likes': len(post.many_likes),
                    'author': user.username,
                    'created': datetime.strptime(post.created[:10],"%Y-%m-%d").strftime("%d.%m.%Y")
                }
                post.likes =  len(post.many_likes)
                s.commit()
                return data
    except sqlalchemy.exc.NoResultFound:
        return None
    return None

@app.post("/api/addLike")
def addLike(payload:OnePost, session_id:str=Cookie(None)):
    user_id = get_user_from_session(session_id)
    with session() as s:
        s:Session
        post = s.execute(select(Posts).filter(Posts.id == payload.id))
        post = post.scalars().first()
        if not post:
            raise HTTPException(404, detail="Post not found")
        if user_id in [like.user_id for like in post.many_likes]:
            raise HTTPException(409, detail="You already liked this post")
        like = Like(user_id=user_id, post_id=post.id)
        s.add(like)
        s.commit()
    raise HTTPException(200, detail="Like added successfully!")

@app.post("/api/removeLike")
def removeLike(payload:OnePost, session_id:str=Cookie(None)):
    user_id = get_user_from_session(session_id)
    with session() as s:
        s:Session
        post = s.execute(select(Posts).filter(Posts.id == payload.id))
        post = post.scalars().first()
        if not post:
            raise HTTPException(404, detail="Post not found")
        like = s.execute(select(Like).filter(Like.user_id == user_id, Like.post_id == post.id))
        like = like.scalars().first()
        if not like:
            raise HTTPException(409, detail="You haven't liked this post yet")
        s.delete(like)
        s.commit()
    raise HTTPException(200, detail="Like removed successfully!")


@app.post("/api/changePassword")
def changePassword(request:ChangePasswordPayload, session_id:str=Cookie(None)):
    user_id = get_user_from_session(session_id)
    password = request.new_password
    with session() as s:
        s:Session
        user = s.execute(select(Users).filter(Users.id == user_id))
        user = user.scalars().first()
        if not user:
            raise HTTPException(401, detail="error while changing password")
        user.password = password
        s.commit()
    raise HTTPException(200, detail="Password changed successfully!")


@app.post("/api/changeUsername")
def changeUsername(request:ChangeUsernamePayload, session_id:str=Cookie(None)):
    user_id = get_user_from_session(session_id)
    username = request.new_username
    with session() as s:
        s:Session
        user = s.execute(select(Users).filter(Users.id == user_id))
        user = user.scalars().first()
        if not user:
            raise HTTPException(401, detail="error while changing username")
        user.username = username
        s.commit()
    raise HTTPException(200, detail="Username changed successfully!")

@app.post("/api/edit_description")
def editDescription(request:EditDescriptionPayload, session_id:str=Cookie(None)):
    user_id = get_user_from_session(session_id)
    description = request.new_description
    with session() as s:
        s:Session
        user = s.execute(select(Users).filter(Users.id == user_id))
        user = user.scalars().first()
        if not user:
            raise HTTPException(401, detail="error while changing description")
        user.description = description
        s.commit()
    raise HTTPException(200, detail="Description changed successfully!")

@app.post("/file/edit_picture")
def editPicture(image:UploadFile = File(...), session_id:str=Cookie(None)):
    import os, shutil
    if not image.content_type.startswith("image/"):
        raise HTTPException(400, detail="edsafasdfa")
    file_extension = os.path.splitext(image.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join("uploads/profiles", unique_filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    user_id = get_user_from_session(session_id)
    with session() as s:
        s:Session
        user = s.execute(select(Users).filter(Users.id == user_id))
        user = user.scalars().first()
        if not user:
            raise HTTPException(401, detail="error while changing description")
        user.picture = f"http://127.0.0.1:8000/file/profile/{unique_filename}"
        s.commit()
    raise HTTPException(200, detail="Description changed successfully!")
    

@app.get("/file/profile/{filename}")
def get_profile_picture(filename: str):
    """
    Возвращает изображение профиля по имени файла.
    """
    file_path = os.path.join("uploads/profiles", filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404, 
            detail="Изображение не найдено"
        )
    
    # Определяем тип содержимого по расширению файла
    # Это позволит браузеру правильно отобразить изображение
    content_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".bmp": "image/bmp",
        ".webp": "image/webp",
    }
    
    file_extension = os.path.splitext(filename)[1].lower()
    media_type = content_types.get(file_extension, "application/octet-stream")
    
    # Возвращаем файл как ответ
    return FileResponse(
        path=file_path, 
        media_type=media_type,
        filename=filename
    )


@app.post("/api/addComment")
def addComment(request:AddComment, session_id:str=Cookie(None)):
    user_id = get_user_from_session(session_id)
    with session() as s:
        s:Session
        comment = Comments(user_id=user_id, post_id=int(request.post_id), text=request.text)
        s.add(comment)
        s.commit()
    raise HTTPException(200, detail="Comment added successfully!")

@app.post("/api/getComments")
def getComment(request:GetComment):
    with session() as s:
        s:Session
        comments = s.execute(select(Comments).filter(Comments.post_id == int(request.post_id)).order_by(Comments.created.desc()))
        comments = comments.scalars().all()
        if not comments:
            return []
        data = []
        for comment in comments:
            user = s.execute(select(Users).filter(Users.id == comment.user_id))
            user = user.scalars().first()
            username = user.username if user else "anonym"
            data.append({
                "username":username,
                "text":comment.text,
                "created":datetime.strptime(comment.created[:10],"%Y-%m-%d").strftime("%d.%m.%Y")
            })
        return data