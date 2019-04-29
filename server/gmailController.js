const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const Axios = require('axios');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
//const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.labels'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

function runEmailController(app) {

    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Gmail API.
        authorize(JSON.parse(content), getEmail, app);
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, app) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, app);
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
function getEmail(auth,app) {
    const gmail = google.gmail({version: 'v1', auth});
    const dbInstance = app.get('db');
    gmail.users.messages.list({
        userId: 'me',
        labelIds: ['INBOX', 'Label_7839103192347937566']
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const messages = res.data.messages;
        if (messages) {
        console.log('Message:');
        messages.forEach((message) => {
            readEmails(gmail, message.id,dbInstance);
            markAsRead(gmail, message.id);
        });
        } else {
        console.log('No Emails found.');
        }
    });
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

function readEmails(gmail, id, dbInstance) {
    gmail.users.messages.get({
      userId: 'me',
      id: id,
    },(err, res) => {
        if (err) return console.log('The API returned an error: ' + err);

        var labels = res.data.labelIds;
//console.log(res.data.labelIds);

        var unread = labels.includes('UNREAD');
        if(unread) {
            var newsLetterId = getNewsletterId(labels);
            //get the subject line
            var headers = res.data.payload.headers;
            var subjectLine = getSubjectLine(headers)
console.log('SUBJECT:',subjectLine);
//console.log('LABEL', newsLetterId);

            //get the body of a message
            var content = '';
            var snippet = '';
            if(res['data']['payload']['parts']) {
                let body = res['data']['payload']['parts'];
                for(let i = 0; i < body.length; i++) {
                    if(body[i].mimeType === 'text/html') {
                        content = body[i].body.data;
                    }
                }
                if( content === ''){
                    content = res['data']['payload']['parts'][1].body.data
                };
                snippet = res.data.snippet;
            } else {
                content = res.data.payload.body.data;
                snippet = res.snippet;
                if(!snippet) {
                    snippet = '';
                }
            }
            
            //check to make sure snippet is not greater then 100 char.
            snippet = trimToHundered(snippet);

            //========insert article into the database
            dbInstance.insert_article([subjectLine,snippet,subjectLine,content,newsLetterId])
            .then(res => {
                console.log('sucessfully inserted into database', res);
            }).catch('erro in inserting into database:', err);
        }
    });
}

//Purpose: send a message to the gmail api to remove email form the inbox
//Params: gmail, the gmail auth info
//        id, the id of the email to update    
//Return: none
function markAsRead(gmail,id) {
    gmail.users.messages.modify({
        userId: 'me',
        id: id,
        resource: {
            removeLabelIds: ['INBOX']
        }
    },(err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        //console.log(res);
    }
    )
}

//Purpose: trim a snippet to only be 100 char long
//Params: string, the string to trim
//Return: none
function trimToHundered(string) {
    //if string is greater then 100 then trim it and return the new string.
    if(string.length > 100) {
        let newString = string.slice(0, 99);
        return newString;
    }

    //if string is not greater then 100 return the string.
    return string;
}

//Purpose: get the newsletters database id
//Params: labels, an array containg label ids
//Return: int, the data base id for the newsletter
function getNewsletterId(labels) {

    //CONST variable holding the label and newsletter id association
    var NEWSLETTER_IDS = {
        theHustle: {
            labelId: 'Label_3017549366576340051',
            databaseId: 2
        },
        theInterface: {
            labelId: 'Label_1548338983973757574',
            databaseId: 3
        },
        axiosAM: {
            labelId: 'Label_1971248218704535777',
            databaseId: 4
        },
        axiosPM: {
            labelId: 'Label_6527581406057305401',
            databaseId: 5
        },
        axiosSpace: {
            labelId: 'Label_6384623345343095147',
            databaseId: 6
        },
        commandLine: {
            labelId: 'Label_5869856446733675402',
            databaseId: 1
        },
        theSkimm: {
            labelId: 'Label_3573153940664208936',
            databaseId: 7
        }
    }

    //find the newsletters label and return the correct id. 
    if(labels.includes(NEWSLETTER_IDS.theHustle.labelId)) {
        return NEWSLETTER_IDS.theHustle.databaseId ;
    }
    if(labels.includes(NEWSLETTER_IDS.theInterface.labelId)) {
        return NEWSLETTER_IDS.theInterface.databaseId ;
    }
    if(labels.includes(NEWSLETTER_IDS.axiosAM.labelId)) {
        return NEWSLETTER_IDS.axiosAM.databaseId ;
    }
    if(labels.includes(NEWSLETTER_IDS.axiosPM.labelId)) {
        return NEWSLETTER_IDS.axiosPM.databaseId ;
    }
    if(labels.includes(NEWSLETTER_IDS.axiosSpace.labelId)) {
        return NEWSLETTER_IDS.axiosSpace.databaseId ;
    }
    if(labels.includes(NEWSLETTER_IDS.commandLine.labelId)) {
        return NEWSLETTER_IDS.commandLine.databaseId ;
    }
    if(labels.includes(NEWSLETTER_IDS.theSkimm.labelId)) {
        return NEWSLETTER_IDS.theSkimm.databaseId ;
    }
}

module.exports = {
    runEmailController: runEmailController
}