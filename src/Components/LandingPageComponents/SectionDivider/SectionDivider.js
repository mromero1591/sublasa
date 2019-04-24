import React from 'react'

export default function SectionDivider(props) {
  return (
    <section className="section">
        <div className="sectionDividerContainer">
          <span className='sectionDividerLine'></span>
          <div className='has-text-centered section-divider-title'>{props.name}</div>
          <span className='sectionDividerLine'></span>
        </div>
    </section>
  )
}
