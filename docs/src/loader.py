from sphinx.jinja2glue import BuiltinTemplateLoader

class TemplateLoader(BuiltinTemplateLoader):
    def init(self, builder, theme=None, dirs=None):
        self.piwik_site = builder.config.html_context.get('piwik_site', 0)
        return super(TemplateLoader, self).init(builder, theme, dirs)

    def render(self, template, context):
        res = super(TemplateLoader, self).render(template, context)
        if template == 'page.html':
            res = res.replace(
                '</body>',
                """
<!-- Custom overlay -->
<script type="text/javascript" src="%(path)s"></script>
</body>""" % {'id': self.piwik_site, 'path': context['pathto']('../../../../erebot-overlay.js', 1)})
        return res

