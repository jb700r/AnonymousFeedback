# AnonymousFeedback

Application used to send anonymous feedback

## Installation

run `git clone {this repo}`  
run `npm install`  
run `node server.js` to start the database server

## Now to post and get feedback you need the client app

### POST REQUEST TO localhost:3000/submit with JSON BODY in this format

```JSON
{
    "Message": "Type your message here"
}
```

### GET REQUEST TO localhost:3000/complaints TO SEE ALL THE FEEDBACK SENT
