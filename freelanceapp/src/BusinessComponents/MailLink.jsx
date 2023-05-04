import react from 'react';

const MailLink = ({email, subject, body, children}) =>{
  return(
  <a style={{color:"#000000"}}
    href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>
    {children}
  </a>
  )
}

export default MailLink;
