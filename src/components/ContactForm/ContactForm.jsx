import css from './ContactForm.module.css';
import { useState } from 'react';

export const ContactForm = ({ onSubmit }) => {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	// Метод оновлення полів input
	const handleChange = event => {
		switch(event.currentTarget.name) {
			case 'name':
				setName(event.currentTarget.value);
				break;
			case 'number':
				setNumber(event.currentTarget.value);
				break;
			default:
				return ;
		}
	}
	// Надсилання форми
	const handleSubmit = event => {
		event.preventDefault();
		onSubmit({ name, number });
		// // Скидання форми
		setName('');
		setNumber('');
	}

	return (
		<form className={css.contact_form} onSubmit={handleSubmit}>
			<div className={css.contact_form_wrapper}>
			<label className={css.label}>
				Name
				<input 
					type="text"
					name="name"
					className={css.input}
					onChange={handleChange}
					value={name}
					pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
				/>
				</label>
				<label className={css.label}>
				Number
				<input
					type="tel"
					name="number"
					className={css.input}
					onChange={handleChange}
					value={number}
					pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
				/>
				</label>
			</div>
			<button type="submit" className={css.btn_submit}>Add contact</button>
		</form>
	);	
}