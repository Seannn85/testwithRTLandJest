import {render,screen} from '@testing-library/react';
import user from "@testing-library/user-event"
import UserForm from './UserForm';


test('it shows two inputs and a button',()=>{

    render(<UserForm/>) // render the component

    const inputs = screen.getAllByRole('textbox') // get all inputs
    const button = screen.getByRole('button') // get the button


    expect(inputs).toHaveLength(2) // check if there are 2 inputs
    expect(button).toBeInTheDocument() // check if the button is in the document





})


test("it calls onUserAdd wne the form is submitted",()=>{
 

  const mock = jest.fn()
  // Try to render my component
  render(<UserForm onUserAdd={mock}/>)


  // Find two inputs


  const nameInput = screen.getByRole('textbox',{name:/name/i})

  const emailInput = screen.getByRole('textbox',{name:/email/i})
  // Simulate typing in a name

  user.click(nameInput);
  user.keyboard('jane');


  // Simulate typing in an email
  user.click(emailInput);
user.keyboard('jane@jane.com')
  // Find the button

  const button = screen.getByRole('button')

  // Simulate clicking on the button

  user.click(button);


  //Assertion to make sure "onUserAdd" gets called with email/name


  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({name:'jane',email:'jane@jane.com'})

})

test('empties the two inputs when form is submitted',()=>{

  render(<UserForm onUserAdd={()=>{}}/>);

  const nameInput = screen.getByRole('textbox',{name:/name/i});
  const emailInput = screen.getByRole('textbox',{name:/email/i});
  const button = screen.getByRole('button');


  user.click(nameInput);
  user.keyboard('jane');
  user.click(emailInput);
  user.keyboard('jane@jane.com');

  user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
  
})