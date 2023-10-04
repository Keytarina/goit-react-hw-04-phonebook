import React, { Component } from "react";
import { nanoid } from 'nanoid'

import css from 'components/App.module.css';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(savedContacts);
    if(parsedContacts){
      this.setState({contacts: parsedContacts}); 
    }
  }

  componentDidUpdate(prevState) {
    if(prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  formSubmitHandle = (data) => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    this.setState({
      contacts: [  ...contacts,
        { 
          id: nanoid(10),
          name: data.name,
          number: data.number
        }
      ]});
  }

  handleChangeFilter = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  }

  onFiltredСontacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  }

  onDeleteContact = (id) => {
    this.setState({contacts: this.state.contacts.filter(contact => contact.id !== id)});
  }

  render() {
    return (
      <div className={css.app}>
        <div className={css.app_container}>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandle} />
          <h2 className={css.title}>Contacts</h2>
          <Filter value={this.state.filter} handleChange={this.handleChangeFilter}/>
          <ContactList filtredСontacts={this.onFiltredСontacts()} onDeleteContact={this.onDeleteContact}/>
        </div>
      </div>
    )
  }
}