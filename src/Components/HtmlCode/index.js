import React from "react";

const HTMLContent = ({ content }) => {
  const parseHTMLContent = (htmlContent) => {
    const truncatedContent = htmlContent.substring(0, 1000);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = truncatedContent;
    tempDiv.querySelectorAll('li').forEach(li => {
      li.innerHTML = li.innerHTML.replace(/&nbsp;/g, '');
    });
    return tempDiv.innerHTML;
  };

  return <div dangerouslySetInnerHTML={{ __html: parseHTMLContent(content) }} />;
};

export default HTMLContent;
