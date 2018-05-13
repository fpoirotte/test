import os
from sphinx.jinja2glue import BuiltinTemplateLoader

class TemplateLoader(BuiltinTemplateLoader):
    def init(self, builder, theme=None, dirs=None):
        self.piwik_site = builder.config.html_context.get('piwik_site', 0)
        self.language = builder.config.language
        self.builder_name = builder.name
        return super(TemplateLoader, self).init(builder, theme, dirs)

    def render(self, template, context):
        res = super(TemplateLoader, self).render(template, context)
        if template == 'page.html':
            res = res.replace(
                '</body>',
                """
<!-- Custom overlay -->
<script type="text/javascript">
var erebot_language = '%(language)s';
var erebot_version = '%(version)s';
var erebot_page = '%(page)s';
var erebot_slug = '%(slug)s';
var erebot_builder = '%(builder)s';
</script>
<script type="text/javascript" src="%(path)s"></script>
</body>""" % {
            'id': self.piwik_site,
            'path': context['pathto']('../../../../erebot-overlay.js', 1),
            'page': context['pagename'],
            'version': context['version'],
            'project': context['project'],
            'slug': os.environ['SPHINX_PROJECT_SLUG'],
            'builder': self.builder_name,
            'language': self.language,
        })
        return res

