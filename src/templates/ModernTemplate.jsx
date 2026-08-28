import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '../components/common/Icons';
import { formatDate, formatUrl, ACCENT_COLOR_MAP } from './templateUtils';

export const ModernTemplate = ({ data }) => {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [], accentColor = 'blue' } = data || {};
  const colors = ACCENT_COLOR_MAP[accentColor] || ACCENT_COLOR_MAP.blue;

  const hasContacts = personal.email || personal.phone || personal.location || personal.linkedin || personal.github || personal.portfolio;

  return (
    <div className="w-full bg-white text-slate-800 p-8 sm:p-10 font-sans leading-normal print:p-8" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="border-b-2 pb-6 mb-6" style={{ borderColor: 'rgba(226, 232, 240, 1)' }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.title && (
              <p className={`text-lg font-semibold mt-1 ${colors.primaryText}`}>
                {personal.title}
              </p>
            )}
          </div>
        </div>

        {/* Contact Links Bar */}
        {hasContacts && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs text-slate-600">
            {personal.email && (
              <div className="flex items-center gap-1.5">
                <Mail className={`w-3.5 h-3.5 ${colors.primaryText}`} />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className={`w-3.5 h-3.5 ${colors.primaryText}`} />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className={`w-3.5 h-3.5 ${colors.primaryText}`} />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-1.5">
                <span className={colors.primaryText}><LinkedInIcon className="w-3.5 h-3.5" /></span>
                <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {formatUrl(personal.linkedin)}
                </a>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-1.5">
                <span className={colors.primaryText}><GitHubIcon className="w-3.5 h-3.5" /></span>
                <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {formatUrl(personal.github)}
                </a>
              </div>
            )}
            {personal.portfolio && (
              <div className="flex items-center gap-1.5">
                <Globe className={`w-3.5 h-3.5 ${colors.primaryText}`} />
                <a href={personal.portfolio.startsWith('http') ? personal.portfolio : `https://${personal.portfolio}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {formatUrl(personal.portfolio)}
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
            Professional Summary
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-3 border-l-2 border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="text-sm font-bold text-slate-900">{exp.jobTitle || 'Position'}</span>
                    {exp.company && (
                      <span className={`text-sm font-semibold ml-1.5 ${colors.primaryText}`}>
                        · {exp.company}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-slate-500 whitespace-nowrap">
                    {formatDate(exp.startDate)} {exp.startDate && (exp.endDate || exp.currentlyWorking) ? '–' : ''} {formatDate(exp.endDate, exp.currentlyWorking)}
                    {exp.location && ` | ${exp.location}`}
                  </div>
                </div>
                {exp.description && (
                  <div className="mt-1.5 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
            Key Projects
          </h2>
          <div className="grid grid-cols-1 gap-3.5">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{proj.name}</span>
                    {proj.url && (
                      <a
                        href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-xs ${colors.primaryText} hover:underline inline-flex items-center gap-0.5`}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                {proj.technologies && (
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                    Tech: <span className="text-slate-700">{proj.technologies}</span>
                  </p>
                )}
                {proj.description && (
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two Column Bottom: Education & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="text-xs font-bold text-slate-900">{edu.degree || 'Degree'}</div>
                  <div className={`text-xs font-semibold ${colors.primaryText}`}>{edu.institution}</div>
                  <div className="text-[11px] text-slate-500">
                    {formatDate(edu.startDate)} {edu.startDate && edu.endDate ? '–' : ''} {formatDate(edu.endDate)}
                    {edu.location && ` | ${edu.location}`}
                  </div>
                  {edu.description && (
                    <p className="text-[11px] text-slate-600 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${colors.tag}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mt-6 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-xs">
                <span className="font-semibold text-slate-800">{cert.name}</span>
                {cert.issuer && <span className="text-slate-500"> · {cert.issuer}</span>}
                {cert.date && <span className="text-slate-400 text-[11px]"> ({formatDate(cert.date)})</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

