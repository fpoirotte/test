(function () {
  var languages = ''; //languages//;
  var versions = '';  //versions//;

  var not_empty = function (v) { return v !== ''; };
  var natsort = function (a, b) {
    var convert = function (v, i) { return jQuery.isNumeric(v) ? parseInt(v) : v; };
    var ka = jQuery.map(a.split(/(\d+)/).filter(not_empty), convert);
    var kb = jQuery.map(b.split(/(\d+)/).filter(not_empty), convert);
    var la = ka.length, lb = kb.length;
    for (var i = 0, m = Math.max(la, lb); i < m; i++) {
      if (i >= la) { return -1; }
      if (i >= lb) { return 1; }

      var ta = typeof(ka[i]), tb = typeof(kb[i]);
      if (ta == tb) {
        if (ka[i] != kb[i]) {
          return (ta == 'string') ? ka[i].localeCompare(kb[i]) : ka[i] - kb[i];
        }
      } else {
        var r = ka[i].toString().localeCompare(kb[i].toString());
        return (r != 0) ? r : ta.localeCompare(tb);
      }
    }
    return 0;
  };

  var code_languages = '';
  languages = languages.split(/\s+/).filter(not_empty).sort();
  for (var lang in languages) {
    code_languages += ` <a data-value="${languages[lang]}" href="/">${languages[lang]}</a>`
  }

  var code_versions = '';
  var has_latest = false;
  var has_stable = false;
  versions = versions.split(/\s+/).filter(not_empty).sort(natsort);
  for (var ver in versions) {
    switch (versions[ver]) {
      case 'latest':
        has_latest = true;
        break;
      case 'stable':
        has_stable = true;
        break;
      default:
        code_versions += ` <a data-value="${versions[ver]}" href="/">${versions[ver]}</a>`;
    }
  }

  if (has_stable || has_latest) {
    var more_versions = '<div>';
    if (has_latest) more_versions += ' <a data-value="latest" href="/">latest</a>'
    if (has_stable) more_versions += ' <a data-value="stable" href="/">stable</a>'
    more_versions += '</div>';
    code_versions = more_versions + code_versions;
  }

  $("head").append( `
<style type="text/css">
#eo {
    line-height: 1;
    background-color: #224;
    color: #99F;
    position: fixed;
    bottom: 0;
    right: 0;
}

#eo a {
    color: #FFF;
    text-decoration: none;
    margin-right: 0.5em;
    font-family: monospace;
    font-size: 125%:
    margin: 0.5em;
}

#eo .eo-active {
    color: #0FF;
}

#eo-title {
    text-align: center;
    font-weight: bolder;
    padding: 0.25em;
    padding-bottom: 0.5em;
    cursor: pointer;
}

#eo-title #eo-icon {
    float: left;
    margin-left: 0.25em;
}

#eo-panel {
    color: #BBC;
    margin-bottom: 0;
    padding: 0.5em;
    border-bottom: 1px solid #666;
    display: none;
    width: 20em;
}

#eo-panel > div {
    display: flex;
    font-weight: bold;
    margin: 0.5em 0;
}

#eo-panel > div > div {
    flex: 50%;
}

#eo-panel input {
    margin-top: 1em;
    width: 94%;
}

.eo-toggle {
    display: none;
}

.eo-toggle:last-child {
    display: inline;
}

.eo-arrow {
    float: right;
    position: relative;
    top: -0.1em;
}

#eo .eo-arrow a {
    margin: -0.5em 0 0.5em 0.5em;
}

#eo-title.eo-opened .eo-active::before {
    content: 'Showing: ';
    color: #99F;
}
</style>
` );

  $("body").append( `
<div id="eo">
  <div id="eo-panel" class="eo-toggle">
    <div>
      <div>Languages:</div>
      <div id="eo-languages">${code_languages}</div>
    </div>
    <div>
      <div>Versions:</div>
      <div id="eo-versions">${code_versions}</div>
    </div>
    <div>
      <div>Formats:</div>
      <div>
        <a class="eo-active" href="/">HTML</a>
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
  <div id="eo-title" title="Click to open/close the toolbox">
    <span class="eo-active">${erebot_version} (${erebot_language})</span>
    <span id="eo-icon"><a>&#9881;</a></span>
    <span class="eo-toggle eo-arrow"><a>&#9660;</a></span>
    <span class="eo-toggle eo-arrow"><a>&#9650;</a></span>
  </div>
</div>
` );

  $("#eo-title").on("click", function () {
    $(".eo-toggle").toggle();
    $(this).toggleClass("eo-opened");
  });

  $('#eo-languages a[data-value="' + erebot_language + '"]').addClass("eo-active");
  $('#eo-versions a[data-value="' + erebot_version + '"]').addClass("eo-active");
})();
