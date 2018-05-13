import os
import json
from sphinx.jinja2glue import BuiltinTemplateLoader

class TemplateLoader(BuiltinTemplateLoader):
    def init(self, builder, theme=None, dirs=None):
        self.piwik_site = builder.config.html_context.get('piwik_site', 0)
        self.language = builder.config.language
        self.builder_name = builder.name
        self.suffix = builder.config.source_suffix
        return super(TemplateLoader, self).init(builder, theme, dirs)

    def render(self, template, context):
        res = super(TemplateLoader, self).render(template, context)
        if template == 'page.html':
            overlay = {
                'base': context['pathto']('./', 1),
                'page': context['pagename'],
                'project': {
                    'name': context['project'],
                    'slug': os.environ['SPHINX_PROJECT_SLUG'],
                    'version': context['version'],
                },
                'default_branch': os.environ['SPHINX_DEFAULT_BRANCH'],
                'builder': self.builder_name,
                'language': self.language,
                'source_suffix': self.suffix,
            }
            res = res.replace(
                '</body>',
                """
<!-- Custom overlay -->
<script type="text/javascript">
var erebot = %(overlay)s;
</script>
<script type="text/javascript" src="%(base)s../../../../erebot-overlay.js"></script>
</body>""" % {
                'id': self.piwik_site,
                'base': context['pathto']('./', 1),
                'overlay': json.dumps(overlay),
            })
        return res

