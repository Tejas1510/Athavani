import mongoose from "mongoose"
import nodemailer from "nodemailer"
import MailSubscibers from "../modules/mailSubscribers.js"
import dotenv from "dotenv"
import PostMessage from "../modules/postMessage.js"
import handlebars from "handlebars"
import fs from "fs"
import path from "path"

// mailSender.js is loaded before index.js,
// so we have to config env and connect to mongoose here.
dotenv.config()
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//  if you are configuring your gmail account,
//  check over here and allow access to your account for following :
//  https://stackoverflow.com/a/41862069

const getMails = async () => {
  try {
    return await MailSubscibers.find()
  } catch (error) {
    console.log(error.message)
  }
}

const getPost = async () => {
  try {
    return await PostMessage.find()
  } catch (error) {
    console.log(error.message)
  }
}

const random = (min, max) => {
  return ~~(Math.random() * (max - min + 1) + min)
}

var htmlFile = fs.readFileSync(
  path.join(path.resolve(), "/html/mail.html"),
  { encoding: "utf-8" },
  (err, html) => {
    if (err) console.log(err)
    return html
  }
)

export const sendMail = async () => {
  var postList = []
  await getPost().then((posts) => (postList = posts))

  var mailList = []
  await getMails().then((mails) => (mailList = mails.map((mail) => mail.email)))

  var idx = random(0, postList.length - 1)

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  })

  var post = postList[idx]
  post.createdAt = new Date(post.createdAt).toDateString().slice(4)
  var template = handlebars.compile(htmlFile)
  var htmlSend = template(post)

  var mailOptions = {
    from: process.env.MAIL,
    to: mailList,
    subject: "Time To Look In the Past",
    attachments: [
      {
        filename: "memories.png",
        path: path.join(path.resolve(), "../client/src/Images/memories.png"),
        cid: "memories",
      },
      {
        filename: "background.png",
        path: post.selectedFile,
        cid: "postImg",
      },
    ],
    html: htmlSend,
  }

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error)
    console.log(info)
  })
}
