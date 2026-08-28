import React from 'react';
import { formatDate, formatUrl, ACCENT_COLOR_MAP } from './templateUtils';

export const ProfessionalTemplate = ({ data }) => {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [], accentColor = 'slate' } = data || {};
  const colors = ACCENT_COLOR_MAP[accentColor] || ACCENT_COLOR_MAP.slate;

  const contactsList = [];
  if (personal.email) contactsList.push(personal.email);
  if (personal.phone) contactsList.push(personal.phone);
  if (personal.location) contactsList.push(personal.location);
  if (personal.linkedin) contactsList.push(formatUrl(personal.linkedin));
  if (personal.github) contactsList.push(formatUrl(personal.github));
  if (personal.portfolio) contactsList.push(formatUrl(personal.portfolio));

  return (
    <div className="w-full bg-white text-slate-900 p-8 sm:p-10 font-serif leading-relaxed print:p-8" style={{ minHeight: '297mm' }}>
      {/* Centered Classic Header */}
      <div className="text-center pb-5 mb-5 border-b-2 border-slate-900">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-widest text-slate-900">
          {personal.fullName || 'YOUR NAME'}
        </h1>
        {personal.title && (
          <p className={`text-base font-sans font-medium tracking-wide uppercase mt-1.5 ${colors.primaryText}`}>
            {personal.title}
          </p>
        )}

        {contactsList.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-3 text-xs font-sans text-slate-600">
            {contactsList.map((contact, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-400 font-bold">|</span>}
                <span>{contact}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <span className="font-bold text-sm text-slate-950">{exp.company || 'Company'}</span>
                    {exp.location && <span className="text-xs text-slate-500 font-sans italic"> — {exp.location}</span>}
                  </div>
                  <div className="text-xs font-sans font-medium text-slate-600">
                    {formatDate(exp.startDate)} {exp.startDate && (exp.endDate || exp.currentlyWorking) ? '–' : ''} {formatDate(exp.endDate, exp.currentlyWorking)}
                  </div>
                </div>

                <div className="text-xs font-sans font-semibold text-slate-800 italic mt-0.5">
                  {exp.jobTitle || 'Role'}
                </div>

                {exp.description && (
                  <div className="mt-1.5 text-xs font-sans text-slate-700 leading-relaxed whitespace-pre-line">
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
        <section className="mb-5">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Key Projects
          </h2>
          <div className="space-y-3 font-sans">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <div className="text-xs font-bold text-slate-900">
                    {proj.name}
                    {proj.technologies && (
                      <span className="font-normal text-slate-500 ml-2">[{proj.technologies}]</span>
                    )}
                  </div>
                  {proj.url && (
                    <span className="text-[11px] text-slate-500">{formatUrl(proj.url)}</span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3 font-sans">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{edu.institution}</span>
                    {edu.location && <span className="text-xs text-slate-500 italic"> — {edu.location}</span>}
                  </div>
                  <div className="text-xs text-slate-600">
                    {formatDate(edu.startDate)} {edu.startDate && edu.endDate ? '–' : ''} {formatDate(edu.endDate)}
                  </div>
                </div>
                <div className="text-xs text-slate-700 italic font-medium">
                  {edu.degree}
                </div>
                {edu.description && (
                  <p className="text-xs text-slate-600 mt-0.5">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Technical & Professional Skills
          </h2>
          <p className="text-xs font-sans text-slate-800 leading-relaxed">
            <span className="font-semibold text-slate-950">Core Competencies: </span>
            {skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-sans text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-slate-800">
                <span className="font-semibold">{cert.name}</span>
                {cert.issuer && <span className="text-slate-600">, {cert.issuer}</span>}
                {cert.date && <span className="text-slate-400"> ({formatDate(cert.date)})</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

