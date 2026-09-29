import { patient } from '../data/seedData.js'

function Field({ k, v }) {
  return (
    <div className="pf-field">
      <div className="k">{k}</div>
      <div className="v">{v}</div>
    </div>
  )
}

export default function Profile() {
  return (
    <section className="view active">
      <div className="topbar"><div><h2>Profile</h2><p>Your personal and insurance information.</p></div></div>

      <div className="card">
        <div className="card-head"><h3>Personal details</h3></div>
        <div className="profile-grid">
          <Field k="Full name" v={patient.name} />
          <Field k="Date of birth" v={<span className="mono">{patient.dob}</span>} />
          <Field k="MRN" v={<span className="mono">{patient.mrn}</span>} />
          <Field k="Phone" v={<span className="mono">{patient.phone}</span>} />
          <Field k="Email" v={patient.email} />
          <Field k="Address" v={patient.address} />
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-head"><h3>Insurance</h3></div>
          <div style={{ marginBottom: 10 }}><Field k="Plan" v={patient.insurance.plan} /></div>
          <div style={{ marginBottom: 10 }}><Field k="Member ID" v={<span className="mono">{patient.insurance.memberId}</span>} /></div>
          <Field k="Group number" v={<span className="mono">{patient.insurance.groupNumber}</span>} />
        </div>
        <div className="card">
          <div className="card-head"><h3>Emergency contact</h3></div>
          <div style={{ marginBottom: 10 }}><Field k="Name" v={patient.emergencyContact.name} /></div>
          <Field k="Phone" v={<span className="mono">{patient.emergencyContact.phone}</span>} />
        </div>
      </div>

      <div className="disclaimer">
        This is a demo application with fictional sample data for illustration purposes. It is not connected
        to any real health record system and should not be used to store, view, or manage real patient information.
      </div>
    </section>
  )
}
