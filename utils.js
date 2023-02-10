import config from "./config";
import Avatar from "./assets/images/user.png";

// Calculate reading time
function getReadingTime(content) {
  if (!content) return;
  const numberOfWords = content
    .replace(/<\/?[^>]+(>|$)/g, "")
    .split(/\s/g).length;
  return Math.ceil(numberOfWords / config.WORDS_PER_MINUTE);
}

// Formate date and time from millis
function formateDate(date) {
  if (!date) return;
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // time formate
  const formattedTime = newDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return [formattedDate, formattedTime];
}

function setPostFields(post) {
  var [date, _] = formateDate(post.attributes.publishedAt);
  post.attributes.published_on = date;
  post.attributes.readingTime = getReadingTime(post.attributes.content);
  post.attributes.image_url = post.attributes.image.data.attributes.url;
  const author = post.attributes.author_id.data.attributes;
  post.attributes.authorName = author.username;
  const authorImage = author.image_url;
  post.attributes.authorImage = authorImage ? authorImage : Avatar;
  post.attributes.authorAltText = author
    ? author.username + "images"
    : "author";
}

export { getReadingTime, formateDate, setPostFields };
