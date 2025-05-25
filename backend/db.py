from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker, relationship
from sqlalchemy import create_engine, Integer, String, ForeignKey, DateTime
from typing import List
from datetime import datetime

class Base(DeclarativeBase):
    pass

class Posts(Base):
    __tablename__ = "posts"
    
    id:Mapped[int] = mapped_column(primary_key=True)
    title:Mapped[str] = mapped_column(nullable=False)
    description:Mapped[str] = mapped_column(nullable=False)
    user_id:Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    likes:Mapped[int] = mapped_column(default=0)
    many_likes:Mapped[List["Like"]] = relationship()
    created:Mapped[str] = mapped_column(nullable=False, default=datetime.now)

class Comments(Base):
    __tablename__ = "comments"

    id:Mapped[int] = mapped_column(primary_key=True)
    post_id:Mapped[int] = mapped_column(nullable=False)
    user_id:Mapped[int] = mapped_column(nullable=False)
    text:Mapped[str] = mapped_column(nullable=False)
    created:Mapped[str] = mapped_column(nullable=False, default=datetime.now)

class Users(Base):
    __tablename__ = "users"

    id:Mapped[int] = mapped_column(primary_key=True)
    email:Mapped[str] = mapped_column(nullable=False, unique=True)
    username:Mapped[str] = mapped_column(nullable=False, unique=True)
    password:Mapped[str] = mapped_column(nullable=False)
    gender:Mapped[str] = mapped_column(nullable=True)
    birthday = mapped_column(DateTime, nullable=True)
    description:Mapped[str] = mapped_column(nullable=True)
    picture:Mapped[str] = mapped_column(nullable=True)

class Like(Base):
    __tablename__ = "likes"

    id:Mapped[int] = mapped_column(primary_key=True)
    user_id:Mapped[int] = mapped_column(nullable=False)
    post_id:Mapped[int] = mapped_column(ForeignKey("posts.id"))
    

#engine = create_engine("sqlite:///backend/db.db", echo=True)
#после добавления новых колонок расскоментировать и обратно закоментировать
#Base.metadata.drop_all(engine)
#Base.metadata.create_all(engine)

