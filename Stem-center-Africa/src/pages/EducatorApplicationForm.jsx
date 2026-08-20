import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../Styles/EducatorApplicationForm.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const INTERNAL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_INTERNAL;
const CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const MAX_EDUCATORS = 10;

/* ── Option lists ── */
const APPLICATION_TYPES = ['School', 'School Network', 'Education District/County', 'Other Education Institution'];
const INSTITUTION_TYPES = ['Public', 'Private', 'Community', 'International', 'Other'];
const POSITION_ROLES = [
  'Principal/Headteacher', 'Deputy Headteacher', 'STEM Coordinator', 'Curriculum Coordinator',
  'District Education Officer', 'Program Director', 'Other',
];
const CHALLENGE_TAGS = [
  'Limited teacher STEM skills', 'Limited access to technology', 'Limited STEM equipment/resources',
  'Limited teacher professional development', 'Limited computer access', 'Limited curriculum integration',
  'Limited funding', 'Limited STEM career exposure for learners', 'Difficulty implementing project-based learning', 'Other',
];
const STEM_ACTIVITIES = [
  'Robotics', 'Coding/Programming', 'Scratch', 'Python', 'Arduino/IoT', '3D Design/3D Printing',
  'Engineering Design', 'Science Projects', 'Mathematics Projects', 'AI', 'STEM Clubs',
  'Science/Technology Fairs', 'Maker Activities', 'None currently', 'Other',
];
const STEM_RESOURCES = [
  'Computer Lab', 'Laptops/Computers', 'Internet', 'Robotics Kits', 'Arduino/Microcontrollers',
  '3D Printers', 'STEM/Maker Kits', 'Drones', 'Tablets', 'Other',
];
const STEM_EXPERIENCE_LEVELS = ['Beginner', 'Basic', 'Intermediate', 'Advanced'];
const PRIMARY_INTERESTS = ['Coding', 'Robotics', 'AI', 'Engineering', 'Making', '3D Design', 'Mathematics', 'Science', 'Other'];
const SUPPORT_METHODS = [
  'Provide time for participation', 'Provide internet access', 'Provide access to computers/devices',
  'Provide STEM equipment/resources', 'Support educators in implementing projects', 'Create/strengthen a STEM club',
  'Organize a school STEM exhibition/fair', 'Support peer-to-peer teacher training', 'Other',
];
const CONTINUED_INTEREST_OPTIONS = [
  'STEM educator mentorship', 'STEM clubs', 'Mobile STEM Outreach', 'STEM equipment/kits',
  'Teacher professional development', 'STEM fairs/challenges', 'Curriculum development',
  'School STEM transformation', 'Research/evaluation partnerships', 'Other',
];

const emptyEducator = () => ({
  fullName: '', email: '', phone: '', roleSubject: '', gradeLevels: '',
  yearsExperience: '', stemExperience: '', interests: [],
});

/* ── Reusable field controls ── */
const RadioGroup = ({ options, value, onChange, name }) => (
  <div className="eaf-choice-grid">
    {options.map((opt) => (
      <label className="eaf-choice" key={opt}>
        <input type="radio" name={name} checked={value === opt} onChange={() => onChange(opt)} />
        <span>{opt}</span>
      </label>
    ))}
  </div>
);

const CheckboxGroup = ({ options, values, onToggle }) => (
  <div className="eaf-choice-grid">
    {options.map((opt) => (
      <label className="eaf-choice" key={opt}>
        <input type="checkbox" checked={values.includes(opt)} onChange={() => onToggle(opt)} />
        <span>{opt}</span>
      </label>
    ))}
  </div>
);

const EducatorApplicationForm = () => {
  /* Section 1 */
  const [institution, setInstitution] = useState({
    applicationType: '', schoolName: '', county: '', subCounty: '', town: '',
    institutionType: '', numLearners: '', numTeachers: '', website: '',
  });

  /* Section 2 */
  const [contact, setContact] = useState({ name: '', position: '', email: '', phone: '' });

  /* Section 3 */
  const [whyJoin, setWhyJoin] = useState('');
  const [challenges, setChallenges] = useState('');
  const [challengeTags, setChallengeTags] = useState([]);

  /* Section 4 */
  const [activities, setActivities] = useState([]);
  const [resources, setResources] = useState([]);

  /* Section 5 */
  const [educatorCount, setEducatorCount] = useState('');
  const [educators, setEducators] = useState([]);

  /* Section 6 */
  const [challengeToAddress, setChallengeToAddress] = useState('');
  const [successLooksLike, setSuccessLooksLike] = useState('');

  /* Section 7 */
  const [supportMethods, setSupportMethods] = useState([]);
  const [expectedReach, setExpectedReach] = useState('');
  const [knowledgeSharing, setKnowledgeSharing] = useState('');
  const [canSupport, setCanSupport] = useState('');
  const [canImplement, setCanImplement] = useState('');
  const [continuedInterest, setContinuedInterest] = useState([]);

  /* Section 8 */
  const [statement, setStatement] = useState('');

  /* Section 9 */
  const [agree, setAgree] = useState(false);
  const [repName, setRepName] = useState('');
  const [repPosition, setRepPosition] = useState('');
  const [repDate, setRepDate] = useState('');

  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const toggleInArray = (arr, setArr, value) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const handleEducatorCountChange = (e) => {
    const raw = e.target.value;
    setEducatorCount(raw);
    const n = parseInt(raw, 10);
    if (!raw || isNaN(n) || n < 1) {
      setEducators([]);
      return;
    }
    const clamped = Math.min(n, MAX_EDUCATORS);
    setEducators((prev) => {
      const next = [...prev];
      if (clamped > next.length) {
        while (next.length < clamped) next.push(emptyEducator());
      } else {
        next.length = clamped;
      }
      return next;
    });
  };

  const updateEducator = (index, field, value) => {
    setEducators((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const toggleEducatorInterest = (index, value) => {
    setEducators((prev) => {
      const next = [...prev];
      const current = next[index].interests;
      next[index] = {
        ...next[index],
        interests: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      };
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    const educatorsBlock = educators
      .map(
        (ed, i) =>
          `Educator ${i + 1}:\n` +
          `  Full Name: ${ed.fullName}\n` +
          `  Email: ${ed.email}\n` +
          `  Phone: ${ed.phone || 'Not provided'}\n` +
          `  Role/Subject: ${ed.roleSubject}\n` +
          `  Grade Level(s): ${ed.gradeLevels}\n` +
          `  Years of Teaching Experience: ${ed.yearsExperience || 'Not provided'}\n` +
          `  Current STEM Experience: ${ed.stemExperience || 'Not specified'}\n` +
          `  Primary STEM Interest: ${ed.interests.length ? ed.interests.join(', ') : 'Not specified'}`
      )
      .join('\n\n');

    const messageBody = [
      'A new SCA STEM Educators Cohort application has been received.',
      '',
      '1. INSTITUTION INFORMATION',
      `Application Type: ${institution.applicationType || 'Not specified'}`,
      `Name of School/District/Organization: ${institution.schoolName}`,
      `County: ${institution.county}`,
      `Sub-County/District: ${institution.subCounty || 'Not provided'}`,
      `Town/Location: ${institution.town}`,
      `Type of Institution: ${institution.institutionType || 'Not specified'}`,
      `Number of Learners Served: ${institution.numLearners}`,
      `Number of Teachers/Educators: ${institution.numTeachers}`,
      `Institution Website/Social Media: ${institution.website || 'Not provided'}`,
      '',
      '2. INSTITUTIONAL CONTACT',
      `Name of Person Completing Application: ${contact.name}`,
      `Position/Role: ${contact.position || 'Not specified'}`,
      `Email: ${contact.email}`,
      `Phone/WhatsApp: ${contact.phone}`,
      '',
      '3. WHY DOES YOUR INSTITUTION WANT TO JOIN?',
      `Why participate: ${whyJoin}`,
      `Biggest challenges: ${challenges}`,
      `Challenge tags: ${challengeTags.length ? challengeTags.join(', ') : 'None selected'}`,
      '',
      '4. CURRENT STEM CAPACITY',
      `Current STEM activities: ${activities.length ? activities.join(', ') : 'None selected'}`,
      `Available STEM resources: ${resources.length ? resources.join(', ') : 'None selected'}`,
      '',
      '5. EDUCATORS TO BE NOMINATED',
      `Number of Educators Nominated: ${educators.length}`,
      educatorsBlock || 'None listed',
      '',
      '6. INSTITUTIONAL STEM CHALLENGE',
      `Challenge to address: ${challengeToAddress}`,
      `What success looks like: ${successLooksLike}`,
      '',
      '7. IMPLEMENTATION COMMITMENT',
      `Support methods: ${supportMethods.length ? supportMethods.join(', ') : 'None selected'}`,
      `Expected learner reach after program: ${expectedReach || 'Not provided'}`,
      `Knowledge sharing plan: ${knowledgeSharing || 'Not provided'}`,
      `Can commit to supporting educators throughout program: ${canSupport || 'Not specified'}`,
      `Can commit to implementing a STEM project after training: ${canImplement || 'Not specified'}`,
      `Interested in continuing to work with SCA: ${continuedInterest.length ? continuedInterest.join(', ') : 'None selected'}`,
      '',
      '8. INSTITUTIONAL STATEMENT',
      statement,
      '',
      '9. DECLARATION',
      `Confirmed commitment: ${agree ? 'Yes' : 'No'}`,
      `Authorized Representative: ${repName || 'Not provided'}`,
      `Position: ${repPosition || 'Not provided'}`,
      `Date: ${repDate || 'Not provided'}`,
    ].join('\n');

    const emailBody = [
      `Thank you for submitting ${institution.schoolName}'s application to the SCA STEM Educators Cohort!`,
      '',
      "We've received your full application, including your nominated educators, and our team will review it shortly.",
      '',
      "We'll be in touch within a few business days with next steps.",
    ].join('\n');

    const templateParams = {
      form_title: `New STEM Educators Cohort Application — ${institution.schoolName}`,
      message_body: messageBody,
      reply_to: contact.email,
      recipient_name: contact.name,
      email_subject: `We've received your application — ${institution.schoolName}`,
      email_body: emailBody,
    };

    try {
      await Promise.all([
        emailjs.send(SERVICE_ID, INTERNAL_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, CONFIRMATION_TEMPLATE_ID, templateParams, PUBLIC_KEY),
      ]);
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="eaf-wrapper">
        <div className="eaf-success">
          <i className="bi bi-check-circle-fill eaf-success__icon"></i>
          <h2>Application Received!</h2>
          <p>
            Thank you! We've sent a confirmation to <strong>{contact.email}</strong>.
            Our team will review {institution.schoolName}'s application and be in
            touch within a few business days.
          </p>
          <Link to="/educators" className="eaf-btn eaf-btn--solid">
            Back to Educators
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="eaf-wrapper">
      <form className="eaf-form" onSubmit={handleSubmit}>
        <h2 className="eaf-title">SCA STEM Educators Cohort Application</h2>
        <p className="eaf-subtitle">
          Apply on behalf of your school, network, or education institution to
          join the next SCA STEM Educators Cohort.
        </p>

        {/* ── 1. Institution Information ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">1. Institution Information</h3>

          <div className="eaf-field">
            <label>Application Type</label>
            <RadioGroup
              options={APPLICATION_TYPES}
              value={institution.applicationType}
              onChange={(v) => setInstitution((p) => ({ ...p, applicationType: v }))}
              name="applicationType"
            />
          </div>

          <div className="eaf-field">
            <label htmlFor="schoolName">Name of School/District/Organization</label>
            <input
              type="text" id="schoolName" required className="eaf-input form-control rounded-0"
              value={institution.schoolName}
              onChange={(e) => setInstitution((p) => ({ ...p, schoolName: e.target.value }))}
            />
          </div>

          <div className="eaf-row">
            <div className="eaf-field">
              <label htmlFor="county">County</label>
              <input
                type="text" id="county" required className="eaf-input form-control rounded-0"
                value={institution.county}
                onChange={(e) => setInstitution((p) => ({ ...p, county: e.target.value }))}
              />
            </div>
            <div className="eaf-field">
              <label htmlFor="subCounty">Sub-County/District</label>
              <input
                type="text" id="subCounty" className="eaf-input form-control rounded-0"
                value={institution.subCounty}
                onChange={(e) => setInstitution((p) => ({ ...p, subCounty: e.target.value }))}
              />
            </div>
          </div>

          <div className="eaf-field">
            <label htmlFor="town">Town/Location</label>
            <input
              type="text" id="town" required className="eaf-input form-control rounded-0"
              value={institution.town}
              onChange={(e) => setInstitution((p) => ({ ...p, town: e.target.value }))}
            />
          </div>

          <div className="eaf-field">
            <label>Type of Institution</label>
            <RadioGroup
              options={INSTITUTION_TYPES}
              value={institution.institutionType}
              onChange={(v) => setInstitution((p) => ({ ...p, institutionType: v }))}
              name="institutionType"
            />
          </div>

          <div className="eaf-row">
            <div className="eaf-field">
              <label htmlFor="numLearners">Number of Learners Served</label>
              <input
                type="number" id="numLearners" required min="0" className="eaf-input form-control rounded-0"
                value={institution.numLearners}
                onChange={(e) => setInstitution((p) => ({ ...p, numLearners: e.target.value }))}
              />
            </div>
            <div className="eaf-field">
              <label htmlFor="numTeachers">Number of Teachers/Educators</label>
              <input
                type="number" id="numTeachers" required min="0" className="eaf-input form-control rounded-0"
                value={institution.numTeachers}
                onChange={(e) => setInstitution((p) => ({ ...p, numTeachers: e.target.value }))}
              />
            </div>
          </div>

          <div className="eaf-field">
            <label htmlFor="website">Institution Website / Social Media</label>
            <input
              type="text" id="website" className="eaf-input form-control rounded-0" placeholder="Optional"
              value={institution.website}
              onChange={(e) => setInstitution((p) => ({ ...p, website: e.target.value }))}
            />
          </div>
        </div>

        {/* ── 2. Institutional Contact ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">2. Institutional Contact</h3>

          <div className="eaf-field">
            <label htmlFor="contactName">Name of Person Completing Application</label>
            <input
              type="text" id="contactName" required className="eaf-input form-control rounded-0"
              value={contact.name}
              onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
            />
          </div>

          <div className="eaf-field">
            <label>Position/Role</label>
            <RadioGroup
              options={POSITION_ROLES}
              value={contact.position}
              onChange={(v) => setContact((p) => ({ ...p, position: v }))}
              name="contactPosition"
            />
          </div>

          <div className="eaf-row">
            <div className="eaf-field">
              <label htmlFor="contactEmail">Email</label>
              <input
                type="email" id="contactEmail" required className="eaf-input form-control rounded-0"
                value={contact.email}
                onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div className="eaf-field">
              <label htmlFor="contactPhone">Phone/WhatsApp</label>
              <input
                type="tel" id="contactPhone" required className="eaf-input form-control rounded-0"
                value={contact.phone}
                onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* ── 3. Why Does Your Institution Want to Join? ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">3. Why Does Your Institution Want to Join?</h3>

          <div className="eaf-field">
            <label htmlFor="whyJoin">
              Why does your school/district want to participate in the SCA STEM Educators program?
            </label>
            <textarea
              id="whyJoin" rows="4" required className="eaf-input form-control rounded-0"
              value={whyJoin} onChange={(e) => setWhyJoin(e.target.value)}
            />
          </div>

          <div className="eaf-field">
            <label htmlFor="challenges">
              What are the biggest challenges your institution currently faces in implementing STEM education?
            </label>
            <textarea
              id="challenges" rows="4" required className="eaf-input form-control rounded-0"
              value={challenges} onChange={(e) => setChallenges(e.target.value)}
            />
          </div>

          <div className="eaf-field">
            <label>Select all that apply</label>
            <CheckboxGroup
              options={CHALLENGE_TAGS}
              values={challengeTags}
              onToggle={(v) => toggleInArray(challengeTags, setChallengeTags, v)}
            />
          </div>
        </div>

        {/* ── 4. Current STEM Capacity ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">4. Current STEM Capacity</h3>

          <div className="eaf-field">
            <label>Which STEM activities currently take place in your institution?</label>
            <CheckboxGroup
              options={STEM_ACTIVITIES}
              values={activities}
              onToggle={(v) => toggleInArray(activities, setActivities, v)}
            />
          </div>

          <div className="eaf-field">
            <label>What STEM resources are currently available?</label>
            <CheckboxGroup
              options={STEM_RESOURCES}
              values={resources}
              onToggle={(v) => toggleInArray(resources, setResources, v)}
            />
          </div>
        </div>

        {/* ── 5. Educators to Be Nominated ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">5. Educators to Be Nominated</h3>

          <div className="eaf-field eaf-field--narrow">
            <label htmlFor="educatorCount">
              How many educators would your institution like to nominate for the cohort?
            </label>
            <input
              type="number" id="educatorCount" min="1" max={MAX_EDUCATORS} required
              className="eaf-input form-control rounded-0" placeholder={`1–${MAX_EDUCATORS}`}
              value={educatorCount} onChange={handleEducatorCountChange}
            />
          </div>

          {educators.length > 0 && (
            <>
              <p className="eaf-hint">
                <strong>Educator Nominee Information</strong> — complete this section for each nominated educator.
              </p>

              {educators.map((ed, index) => (
                <div className="eaf-educator-card" key={index}>
                  <h4 className="eaf-educator-card__title">Educator {index + 1}</h4>

                  <div className="eaf-row">
                    <div className="eaf-field">
                      <label htmlFor={`edu-name-${index}`}>Full Name</label>
                      <input
                        type="text" id={`edu-name-${index}`} required className="eaf-input form-control rounded-0"
                        value={ed.fullName}
                        onChange={(e) => updateEducator(index, 'fullName', e.target.value)}
                      />
                    </div>
                    <div className="eaf-field">
                      <label htmlFor={`edu-email-${index}`}>Email</label>
                      <input
                        type="email" id={`edu-email-${index}`} required className="eaf-input form-control rounded-0"
                        value={ed.email}
                        onChange={(e) => updateEducator(index, 'email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="eaf-row">
                    <div className="eaf-field">
                      <label htmlFor={`edu-phone-${index}`}>Phone</label>
                      <input
                        type="tel" id={`edu-phone-${index}`} className="eaf-input form-control rounded-0" placeholder="Optional"
                        value={ed.phone}
                        onChange={(e) => updateEducator(index, 'phone', e.target.value)}
                      />
                    </div>
                    <div className="eaf-field">
                      <label htmlFor={`edu-role-${index}`}>Role/Subject</label>
                      <input
                        type="text" id={`edu-role-${index}`} required className="eaf-input form-control rounded-0"
                        value={ed.roleSubject}
                        onChange={(e) => updateEducator(index, 'roleSubject', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="eaf-row">
                    <div className="eaf-field">
                      <label htmlFor={`edu-grade-${index}`}>Grade Level(s)</label>
                      <input
                        type="text" id={`edu-grade-${index}`} required className="eaf-input form-control rounded-0"
                        value={ed.gradeLevels}
                        onChange={(e) => updateEducator(index, 'gradeLevels', e.target.value)}
                      />
                    </div>
                    <div className="eaf-field">
                      <label htmlFor={`edu-years-${index}`}>Years of Teaching Experience</label>
                      <input
                        type="text" id={`edu-years-${index}`} className="eaf-input form-control rounded-0" placeholder="Optional"
                        value={ed.yearsExperience}
                        onChange={(e) => updateEducator(index, 'yearsExperience', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="eaf-field">
                    <label>Current STEM Experience</label>
                    <RadioGroup
                      options={STEM_EXPERIENCE_LEVELS}
                      value={ed.stemExperience}
                      onChange={(v) => updateEducator(index, 'stemExperience', v)}
                      name={`stemExperience-${index}`}
                    />
                  </div>

                  <div className="eaf-field">
                    <label>Primary STEM Interest</label>
                    <CheckboxGroup
                      options={PRIMARY_INTERESTS}
                      values={ed.interests}
                      onToggle={(v) => toggleEducatorInterest(index, v)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* ── 6. Institutional STEM Challenge ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">6. Institutional STEM Challenge</h3>

          <div className="eaf-field">
            <label htmlFor="challengeToAddress">
              Identify one real STEM education challenge that your institution wants to address.
            </label>
            <textarea
              id="challengeToAddress" rows="4" required className="eaf-input form-control rounded-0"
              value={challengeToAddress} onChange={(e) => setChallengeToAddress(e.target.value)}
            />
          </div>

          <div className="eaf-field">
            <label htmlFor="successLooksLike">
              What would success look like for your institution after participating in the program?
            </label>
            <textarea
              id="successLooksLike" rows="4" required className="eaf-input form-control rounded-0"
              value={successLooksLike} onChange={(e) => setSuccessLooksLike(e.target.value)}
            />
          </div>
        </div>

        {/* ── 7. Implementation Commitment ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">7. Implementation Commitment</h3>

          <div className="eaf-field">
            <label>How will your institution support participating educators?</label>
            <CheckboxGroup
              options={SUPPORT_METHODS}
              values={supportMethods}
              onToggle={(v) => toggleInArray(supportMethods, setSupportMethods, v)}
            />
          </div>

          <div className="eaf-field">
            <label htmlFor="expectedReach">
              After completing the program, how many learners do you expect participating educators to reach?
            </label>
            <input
              type="text" id="expectedReach" className="eaf-input form-control rounded-0"
              value={expectedReach} onChange={(e) => setExpectedReach(e.target.value)}
            />
          </div>

          <div className="eaf-field">
            <label htmlFor="knowledgeSharing">
              How will your institution share the knowledge gained with other educators?
            </label>
            <textarea
              id="knowledgeSharing" rows="3" className="eaf-input form-control rounded-0"
              value={knowledgeSharing} onChange={(e) => setKnowledgeSharing(e.target.value)}
            />
          </div>

          <div className="eaf-field">
            <label>Can your institution commit to supporting participating educators throughout the program?</label>
            <RadioGroup
              options={['Yes', 'No']}
              value={canSupport}
              onChange={setCanSupport}
              name="canSupport"
            />
          </div>

          <div className="eaf-field">
            <label>Can your institution commit to implementing at least one STEM project/activity following the training?</label>
            <RadioGroup
              options={['Yes', 'No', 'We need additional support']}
              value={canImplement}
              onChange={setCanImplement}
              name="canImplement"
            />
          </div>

          <div className="eaf-field">
            <label>Would your institution be interested in continuing to work with STEM Center Africa after the cohort?</label>
            <CheckboxGroup
              options={CONTINUED_INTEREST_OPTIONS}
              values={continuedInterest}
              onToggle={(v) => toggleInArray(continuedInterest, setContinuedInterest, v)}
            />
          </div>
        </div>

        {/* ── 8. Institutional Statement ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">8. Institutional Statement</h3>
          <div className="eaf-field">
            <label htmlFor="statement">
              In 250 words or less, explain why your school/district should be selected for the next SCA STEM Educators Cohort.
            </label>
            <textarea
              id="statement" rows="6" required className="eaf-input form-control rounded-0"
              value={statement} onChange={(e) => setStatement(e.target.value)}
            />
          </div>
        </div>

        {/* ── 9. Declaration ── */}
        <div className="eaf-section">
          <h3 className="eaf-section__title">9. Declaration</h3>

          <p className="eaf-declaration-text">
            <strong>Institutional Commitment:</strong> By submitting this
            application, we confirm that the information provided is
            accurate and that, if selected, our institution will support
            the nominated educators to participate fully in the SCA STEM
            Educators Cohort and apply the knowledge and skills gained
            within our learning environment.
          </p>

          <label className="eaf-checkbox">
            <input
              type="checkbox" checked={agree}
              onChange={(e) => setAgree(e.target.checked)} required
            />
            <span>I confirm and agree to the above commitment.</span>
          </label>

          <div className="eaf-row">
            <div className="eaf-field">
              <label htmlFor="repName">Name of Authorized Representative</label>
              <input
                type="text" id="repName" className="eaf-input form-control rounded-0"
                value={repName} onChange={(e) => setRepName(e.target.value)}
              />
            </div>
            <div className="eaf-field">
              <label htmlFor="repPosition">Position</label>
              <input
                type="text" id="repPosition" className="eaf-input form-control rounded-0"
                value={repPosition} onChange={(e) => setRepPosition(e.target.value)}
              />
            </div>
          </div>

          <div className="eaf-field eaf-field--narrow">
            <label htmlFor="repDate">Date</label>
            <input
              type="date" id="repDate" className="eaf-input form-control rounded-0"
              value={repDate} onChange={(e) => setRepDate(e.target.value)}
            />
          </div>
        </div>

        {status === 'error' && (
          <p className="eaf-error">
            {agree
              ? 'Something went wrong sending your application. Please try again or reach us on WhatsApp.'
              : 'Please confirm and agree to the commitment above before submitting.'}
          </p>
        )}

        <button
          type="submit"
          className="eaf-btn eaf-btn--solid eaf-submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </section>
  );
};

export default EducatorApplicationForm;
