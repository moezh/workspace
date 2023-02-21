import https from "https";
import {readFileSync} from "fs";

const pushoverFile = readFileSync("/run/secrets/pushover-config", {
  encoding: "utf8",
});

const {user, token} = JSON.parse(pushoverFile);

export const pushover = (title: string, message: string, url: string) => {
  const data = JSON.stringify({
    token: token,
    user: user,
    html: "1",
    title: title,
    message: message,
    url_title: "More details",
    url: url,
    sound: "vibrate",
  });
  const options = {
    hostname: "api.pushover.net",
    port: 443,
    path: "/1/messages.json",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  const request = https
    .request(options, (resp) => {
      resp.on("data", (d) => {
        console.log("Pushover: " + d);
      });
    })
    .on("error", (err) => {
      console.log("Pushover - Error: " + err.message);
    });
  request.write(data);
  request.end();
};
