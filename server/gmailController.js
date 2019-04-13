const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
//const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.labels'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), getEmail);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getEmail(auth) {
    const gmail = google.gmail({version: 'v1', auth});

    gmail.users.messages.list({
        userId: 'me',
        labelIds: ['INBOX', 'Label_7839103192347937566']
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const messages = res.data.messages;
        if (messages) {
        console.log('Message:');
        messages.forEach((message) => {
            readEmails(gmail, message.id);
            //markAsRead(gmail, message.id);
        });
        } else {
        console.log('No Emails found.');
        }
    });

    // gmail.users.labels.list({
    //     userId: 'me',
    // }, (err, res) => {
    //     if (err) return console.log('The API returned an error: ' + err);
    //     const labels = res.data;
    //     console.log(labels)
    //     if (labels.length) {
    //     console.log('labels:');
    //     labels.forEach((label) => {
    //         console.log(lable);
    //         //readEmails(gmail, label.id);
    //     });
    //     } else {
    //     console.log('No labels found.');
    //     }
    // });
}

//Purpose: Get the subject line from a specific message
//Params: Array, an array that contains header objects.
//Return: String, The Subject line of an email.
function getSubjectLine(headers) {
    const SUBJECT_LINE_SERCH = 'Subject';
    
    var ObjSubjectLine = headers.find(function(head) {
        return head.name === SUBJECT_LINE_SERCH;
    });

    return ObjSubjectLine.value;
}

//Purpose: Get the body from a specific message
//Params: Obj, A res that contains a messages info.
//Return: String, the contents of the message
function getMessageContent(res) {
    var messageRaw = res['data']['payload']['parts'][0].body.data;
    var data = messageRaw;  
    console.log(data);
    var buff = new Buffer.from(data, 'base64');  
    var text = buff.toString();
    return text;
}

function readEmails(gmail, id) {
    gmail.users.messages.get({
      userId: 'me',
      id: id,
    },(err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data.labelIds);
        var labels = res.data.labelIds;
        var unread = labels.includes('UNREAD');
        if(unread) {
            //get the subject line
            var headers = res.data.payload.headers;
            var subjectLine = getSubjectLine(headers)
            console.log('SUBJECT:',subjectLine);

            //get the body of a message
            var messageContent = getMessageContent(res);
            console.log(messageContent);
        }
    });
}

function markAsRead(gmail,id) {
    gmail.users.messages.modify({
        userId: 'me',
        id: id,
        resource: {
            removeLabelIds: ['INBOX']
        }
    },(err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res);
    }
    )
}