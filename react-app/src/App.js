import React from 'react';
import './App.css';
import Axios from 'axios';

function App() {
	const [ email, setEmail ] = React.useState('');
	const [ subject, setSubject ] = React.useState('');
	const [ text, setText ] = React.useState('');
	const [ error, setError ] = React.useState('');
	const [success,setSuccess] = React.useState('');

	const senderFunc = () => {
		console.log({
			email,
			subject,
			text,
		});

		if (!email) {
			setError('Missing Email address!');
			return;
		}
		if (!subject) {
			setError('Missing Subject!');
			return;
		}
		if (!text) {
			setError('Missing Text field!');
			return;
		}
		setError('');
		
		Axios.post(`${process.env.API_ENDPOINT}`,{
			to: email,
			subject,
			text,
			from: 'utsavpandey8@gmail.com'
		}).then(() => {
			setEmail('');
			setSubject('');
			setText('');
			setSuccess('Your email was sent successfully!');
		}).catch(err => {
			console.log('Error in post request by axios',err);
			setSuccess('');
			setError(err.message || 'Unable to send with this email')
		})

	};

	return (
		<div className="container">
			<div className="row">
				<h1> Contact Form</h1>
			</div>
			<div className="row input-container">
			
				<div className="col-md-6 col-sm-12">
					<div className="styled-input">
						<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
						<label>Email</label>
					</div>
				</div>
				<div className="col-md-6 col-sm-12">
					<div className="styled-input"  style={{ float: 'right' }}>
						<input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
						<label>Subject</label>
					</div>
				</div>
				<div className="col-xs-12">
					<div className="styled-input wide">
						<textarea value={text} onChange={(e) => setText(e.target.value)} required />
						<label>Text</label>
						{error ? <p className="error-message ">{error}</p> : null}
						{success ? <p className="success-message ">{success}</p> : null}
					</div>
				</div>
				<div className="col-xs-12">
					<div className="btn-lrg submit-btn" onClick={senderFunc}>
						Send Message
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
