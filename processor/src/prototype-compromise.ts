import nlp from 'compromise/three';

let trie = nlp.buildTrie(['entry level']);

// const testStr =
//   '<span>Software Engineer [Entry Level]<span class="css-1syol37 esbq1260"> - job post</span></span>';

const testStr =
  '<div>\n <h4 class="jobSectionHeader"><b>Job Highlights </b></h4>\n <ul>\n  <li>Learning &amp; development opportunities. </li>\n  <li>Competitive pay package. </li>\n  <li>Work Life Balance. </li>\n </ul>\n <p></p>\n <h4 class="jobSectionHeader"><b>Requirements </b></h4>\n <ul>\n  <li>Working closely with the team to maintain existing and develop new web &amp; mobile applications. </li>\n  <li>Responsible for both front end and back end of the project. </li>\n  <li>Analyse requirements and write code that solves day to day challenges of business users. </li>\n  <li>Understanding of the entire web development process (design, development and deployment). </li>\n  <li>Ensure the quality of the coding. </li>\n </ul>\n <p></p>\n <h4 class="jobSectionHeader"><b>Qualifications </b></h4>\n <ul>\n  <li>Degree or Diploma in Computer Science, Software Engineering or other equivalent degrees/experience. </li>\n  <li>Active team player with strong problem-solving skills and desire to explore. </li>\n  <li>Willing to learn and share knowledge. </li>\n  <li>Effective oral and written communication skills in English and Chinese. </li>\n  <li>Experience with any OOP language (C#, Java, Python). </li>\n </ul>\n <p></p>\n <div>\n  Interested candidates, kindly email detailed resumes to info@dongertech.com indicating availability, current and expected salary. All profiles will be handled with strictest confidentiality. Only shortlisted candidates will be notified, Thank you.\n </div>\n</div>\n<div></div> \n<br>\n<div>\n <div>\n  <div>\n   <div>\n    <h1 class="jobSectionHeader"><b>Why Join Us </b></h1>\n    <h3 class="jobSectionHeader"><b>Valuable Opportunities </b></h3>\n    <h4 class="jobSectionHeader"><b>As a fast-growing start-up, we are committed to invest in the continued career development of our employees. You will be offered valuable learning opportunities to expand your abilities by picking up a variety of skills.<br> </b></h4>\n    <br> \n    <h3 class="jobSectionHeader"><b>Employee Empowerment </b></h3>\n    <h4 class="jobSectionHeader"><b>As a pioneer in our industry, there are plenty of opportunities to grow. We empower our employees to be at the forefront, leading to growth opportunities. You will be strongly encouraged to contribute and share your feedback or ideas to help the organization attain success.<br> </b></h4>\n    <br> \n    <h3 class="jobSectionHeader"><b>Work-Life Balance </b></h3>\n    <h4 class="jobSectionHeader"><b>As a fun-loving team, we understand that \'all work and no play makes Jack a dull boy\', and satisfied employees are essential to our company\'s success. Every employee\'s health, safety and wellbeing are of utmost importance to us. We offer flexible working hours and practices to give you a healthy work-life balance.<br> </b></h4>\n    <br> \n    <h3 class="jobSectionHeader"><b>Striving for Excellence </b></h3>\n    <h4 class="jobSectionHeader"><b>As a customer-oriented organization, we place customer satisfaction at the core of every business decision. Our team is fully focused on delivering true value to help our clients succeed in a challenging business environment. We foster state-of-the-art technical and operational skills and strive for excellence at every touch point with our clients. Your professionalism and contribution to quality work will be highly valued.<br> </b></h4>\n    <br> \n    <h3 class="jobSectionHeader"><b>Welcoming Innovation </b></h3>\n    <h4 class="jobSectionHeader"><b>As entrepreneurs, we challenge the industry and are committed to drive innovations and day-to-day improvements to shape exciting business opportunities. If you act and think like an entrepreneur – dare to make use of opportunities and take risks, take ownership and responsibility, and embrace new ideas, you are the team member we are looking for. This mindset is the key to completing our ambitious, innovative projects.</b></h4>\n   </div>\n  </div>\n </div>\n</div>';
const transformed = testStr
  .replace(/(<([^>]+)>)/gi, '')
  .replace('- job post', '')
  .trim();

console.log(transformed);
const doc = nlp(transformed);

let m = doc.lookup(trie);
const res = m.docs.map((p) => {
  let res = '';
  for (let i = 0; i < p.length; i++) {
    if (i !== 0) res += ' ';
    res += p[i].normal;
  }
  return res;
});

console.log(res);

//match net
// let net = nlp.buildNet([{ match: '#Number years working experience' }]);

// const doc = nlp('5 years working experience');

// let res = doc.sweep(net);
// console.log(res);
