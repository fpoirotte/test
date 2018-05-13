$(window).on("load", function () {
  var cur_language = 'en';
  var cur_version = 'latest';
  var languages = 'en fr de it pt es ja';
  var versions = '4.3.2 0.2.1 stable 3.14 latest 1.2.3 1.414.27';

  var code_lang = '';
  var code_ver = '';
  var has_latest = false;
  var has_stable = false;

  languages = languages.split(/\s+/).sort();
  for (var lang in languages) {
    code_lang += ` <a data-value="${languages[lang]}" href="/">${languages[lang]}</a>`
  }

  versions = versions.split(/\s+/).sort();
  for (var ver in versions) {
    switch (versions[ver]) {
      case 'latest':
        has_latest = true;
        break;
      case 'stable':
        has_stable = true;
        break;
      default:
        code_ver += ` <a data-value="${versions[ver]}" href="/">${versions[ver]}</a>`;
    }
  }

  if (has_stable || has_latest) {
    var more_code_ver = '<div>';
    if (has_latest) more_code_ver += ' <a data-value="latest" href="/">latest</a>'
    if (has_stable) more_code_ver += ' <a data-value="stable" href="/">stable</a>'
    more_code_ver += '</div>';
    code_ver = more_code_ver + code_ver;
  }

  $("head").append( `
<style type="text/css">
#erebot-overlay {
    background-color: #224;
    color: #99F;
    position: fixed;
    top: 0;
    left: 50%;
    margin: 0 0 0 -20%;
    width: 40%;
}

#erebot-overlay a {
    color: #FFF;
    text-decoration: none;
    margin-right: 0.5em;
}

#erebot-overlay .erebot-overlay-active {
    color: #0FF;
}

#erebot-overlay-title {
    text-align: center;
    font-weight: bolder;
    padding: 0.25em;
    cursor: pointer;
}

#erebot-overlay-title #erebot-overlay-icon {
    float: left;
    margin-left: 0.25em;
}

#erebot-overlay-title > span {
    margin-left: 1em;
}

#erebot-overlay-panel {
    color: #BBC;
    margin-top: 10px;
    padding: 0.5em;
    border-top: 1px solid #666;
    display: none;
}

#erebot-overlay-panel > div {
    display: flex;
    font-weight: bold;
    margin: 0.5em 0;
}

#erebot-overlay-panel > div > div {
    flex: 50%;
}

#erebot-overlay-panel input {
	margin-top: 1em;
    width: 95%;
}

.erebot-overlay-toggle {
    display: none;
}

.erebot-overlay-toggle:last-child {
    display: inline;
}
</style>
` );

  $("body").append( `
<div id="erebot-overlay">
  <div id="erebot-overlay-title">
    <span>Settings (<span class="erebot-overlay-active">${cur_language}, ${cur_version}</span>)</span>
    <span id="erebot-overlay-icon"><a>&#9881;</a></span>
    <span class="erebot-overlay-toggle"><a>&#9650;</a></span>
    <span class="erebot-overlay-toggle"><a>&#9660;</a></span>
  </div>
  <div id="erebot-overlay-panel" class="erebot-overlay-toggle">
    <div>
      <div>Languages:</div>
      <div id="erebot-overlay-languages">${code_lang}</div>
    </div>
    <div>
      <div>Versions:</div>
      <div id="erebot-overlay-versions">${code_ver}</div>
    </div>
    <div>
      <div>Formats:</div>
      <div>
        <a class="erebot-overlay-active" href="/">HTML</a>
        <a href="/">PDF</a>
      </div>
    </div>
    <div>
      <div>Contribute:</div>
      <div>
        <a href="/">Edit</a>
        <a href="/">Translate</a>
      </div>
    </div>
    <div>
    	<div>
        Search
        <form action="" method="GET" target="_blank">
          <input name="q" placeholder="Search in the docs"/>
        </form>
        </div>
    </div>
  </div>
</div>
` );

  $("#erebot-overlay-title").on("click", function () {
    $(".erebot-overlay-toggle").toggle();
  });

  $('#erebot-overlay-languages a[data-value="' + cur_language + '"]').addClass("erebot-overlay-active");
  $('#erebot-overlay-versions a[data-value="' + cur_version + '"]').addClass("erebot-overlay-active");
});
