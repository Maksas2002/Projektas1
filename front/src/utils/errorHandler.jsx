function errorHandler(error) {
  // testing error messages from back
  const match = error.response.data.match(/<pre>([\s\S]*?)<\/pre>/);
  let errorText = match ? match[1] : null;

  // Clean HTML entities and <br>
  if (errorText) {
    errorText = errorText
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/&nbsp;/g, " ")
      .trim();
  }

  const firstLine = errorText.split("\n")[0];
  const message = firstLine.replace(/^Error:\s*/, "");

  return message;
}

export default errorHandler;