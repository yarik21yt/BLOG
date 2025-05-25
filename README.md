# BLOG

## Template for blog website, that we maded using js, python, next-js, redis



BLOG - Template blog project by: yarik21yt and dhvendev, for some blog social media i guess?
## We are used:
- Next JS   (javascript)
- Python
- Redis


## Features

- Registration and login
- Profile pages and profile edits!
- Adding posts
- Changing  Profile Picture
- LIKES for posts!

That project is OPEN-SOURCE, so, you can add something if you want :-)

## INSTALLING AND BUILDING THE BLOG PROJECT:

You need to install Python (recomended Python 3.12), Redis, node-js

After installing python, you need to install that libraries:
```sh
cd backend
pip install -r requrements.txt
```
All requrement libraries for python will installs! (recomend making venv)

For next js:
```sh
cd app
npm install
```

### for running project you need that commands:
FRONTEND
```sh
cd app
npm run dev
```
BACKEND
```sh
cd backend
uvicorn main:app --reload
```
REDIS SERVER
```sh
redis-server
```

if you are on a windows, and you've got an error, try that command before running:
```sh
Set-ExecutionPolicy RemoteSigned
```


## License
MIT
**Free Software, yahoo :D**
