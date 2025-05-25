from pydantic import BaseModel
from typing import Optional

class Post(BaseModel):
    title:str
    description:str

class Register(BaseModel):
    email:str
    username:str
    password:str
    gender:Optional[str] = None
    birthday:Optional[str] = None

class Login(BaseModel):
    email:str
    password:str

class AddPost(BaseModel):
    title:str
    description:Optional[str] = None

class ChangePasswordPayload(BaseModel):
    new_password:str
class ChangeUsernamePayload(BaseModel):
    new_username:str

class EditDescriptionPayload(BaseModel):
    new_description:str

class OnePost(BaseModel):
    id:str

class AddComment(BaseModel):
    post_id:str
    text:str

class GetComment(BaseModel):
    post_id:str

class GetOtherProfile(BaseModel):
    username:str