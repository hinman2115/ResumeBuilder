import React from 'react';
import { formatDate, formatUrl, ACCENT_COLOR_MAP } from './templateUtils';

export const MinimalTemplate = ({ data }) => {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [], accentColor = 'blue' } = data || {};
  const colors = ACCENT_COLOR_MAP[accentColor] || ACCENT_COLOR_MAP.blue;

  const contactsList = [];
  if (personal.email) contactsList.push(personal.email);
  if (personal.phone) contactsList.push(personal.phone);
  if (personal.location) contactsList.push(personal.location);
  if (personal.linkedin) contactsList.push(formatUrl(personal.linkedin));
  if (personal.github) contactsList.push(formatUrl(personal.github));
  if (personal.portfolio) contactsList.push(formatUrl(personal.portfolio));

  return (
    <div className="w-full bg-white text-slate-800 p-8 sm:p-10 font-sans leading-normal print:p-8" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-slate-900">
          <span className="font-semibold">{personal.fullName?.split(' ')[0]}</span>{' '}
          {personal.fullName?.split(' ').slice(1).join(' ') || ''}
        </h1>
        {personal.title && (
          <p className={`text-sm font-medium tracking-wider uppercase mt-1 ${colors.primaryText}`}>
            {personal.title}
          </p>
        )}

        {contactsList.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500 font-light">
            {contactsList.map((contact, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                <span>{contact}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            {summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="text-xs font-semibold text-slate-900">
                    {exp.jobTitle}{exp.company ? ` — ${exp.company}` : ''}
                  </div>
                  <div className="text-[11px] text-slate-400 font-light">
                    {formatDate(exp.startDate)} {exp.startDate && (exp.endDate || exp.currentlyWorking) ? '–' : ''} {formatDate(exp.endDate, exp.currentlyWorking)}
                    {exp.location && ` · ${exp.location}`}
                  </div>
                </div>
                {exp.description && (
                  <div className="mt-1 text-xs text-slate-600 font-light leading-relaxed whitespace-pre-line">
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
          <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-slate-900">{proj.name}</span>
                  {proj.url && <span className="text-[11px] text-slate-400 font-light">{formatUrl(proj.url)}</span>}
                </div>
                {proj.technologies && (
                  <p className="text-[11px] text-slate-400 italic mt-0.5">{proj.technologies}</p>
                )}
                {proj.description && (
                  <p className="text-xs text-slate-600 font-light mt-0.5 whitespace-pre-line leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="text-xs font-medium text-slate-900">{edu.degree}</div>
                  <div className="text-xs text-slate-600 font-light">{edu.institution}</div>
                  <div className="text-[11px] text-slate-400 font-light">
                    {formatDate(edu.startDate)} {edu.startDate && edu.endDate ? '–' : ''} {formatDate(edu.endDate)}
                    {edu.location && ` · ${edu.location}`}
                  </div>
                  {edu.description && (
                    <p className="text-[11px] text-slate-500 font-light mt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-xs font-light bg-slate-100 text-slate-700"
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
          <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 font-light">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <span className="font-medium text-slate-900">{cert.name}</span>
                {cert.issuer && <span> — {cert.issuer}</span>}
                {cert.date && <span className="text-slate-400 text-[11px]"> ({formatDate(cert.date)})</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

