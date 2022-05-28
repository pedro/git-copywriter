console.log("github-copywriter enabled");

const max = 72;
const wrap = (s) => s.replace(
  /(?![^\n]{1,72}$)([^\n]{1,72})\s/g, '$1\n'
);

let observer = new MutationObserver(() => {
  const title = $("#merge_title_field");
  const message = $("#merge_message_field");
  if (title.length !== 1 || message.length !== 1) {
    return;
  }
  const tl = $(`<p id="title-len">${title.val().length}</p>`)
  tl.css({ position: "absolute", right: "25px", top: "22px", color: "#0C0" })
  title.before(tl);

  const setLen = n => {
    tl.html(title.val().length.toString());
    tl.css({ color: n > max ? "#C00" : "#0C0" });
  };

  const defaultColor = title.css("color");
  title.change(() => setLen(title.val().length));
  title.keyup(() => {
    const color = title.val().length > max ? "#C00" : defaultColor;
    title.css({ color });
    setLen(title.val().length);
  })

  message.keypress(() => {
    message.val(wrap(message.val()))
  });

  observer.disconnect();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
