// MentalHealthForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase';

const questions = [
  'How would you describe your overall mood and emotional state recently?',
  'Are you experiencing any significant changes in your sleep patterns (e.g., insomnia, oversleeping)?',
  'Have you noticed any changes in your appetite or eating habits?',
  'Are you finding it difficult to concentrate or make decisions?',
  'Do you have any feelings of hopelessness or thoughts of harming yourself?',
  'Are you able to engage in activities you usually enjoy?',
  'Have you been feeling excessively anxious or worried?',
  'Are you experiencing any physical symptoms without an apparent cause (e.g., headaches, stomachaches)?',
  'Do you feel supported and able to talk about your feelings with someone you trust?',
  'Have you experienced any major life changes or stressors recently?',
];

const options = [
  ['Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'],
  ['No changes', 'Slight changes', 'Moderate changes', 'Significant changes', 'Severe changes'],
  ['No changes', 'Slight changes', 'Moderate changes', 'Significant changes', 'Severe changes'],
  ['Not at all', 'Occasionally', 'Sometimes', 'Often', 'Always'],
  ['Never', 'Rarely', 'Occasionally', 'Frequently', 'Always seek help immediately'],
  ['All activities', 'Most activities', 'Some activities', 'Few activities', 'No activities'],
  ['Not at all', 'Occasionally', 'Sometimes', 'Often', 'Constantly'],
  ['No physical symptoms', 'Mild physical symptoms', 'Moderate physical symptoms', 'Severe physical symptoms', 'Extreme physical symptoms'],
  ['Always', 'Most of the time', 'Sometimes', 'Rarely', 'Never'],
  ['No major changes or stressors', 'Minor changes or stressors', 'Moderate changes or stressors', 'Significant changes or stressors', 'Overwhelming changes or stressors'],
];

const MentalHealthForm = () => {
  const [formData, setFormData] = useState(
    Object.fromEntries(questions.map((question) => [question, '']))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the user's data to the 'mentalHealthData' collection
      const docRef = await addDoc(collection(db, 'mentalHealthData'), formData);
      console.log('Document written with ID: ', docRef.id);

      // Reset the form after successful submission
      setFormData(Object.fromEntries(questions.map((question) => [question, ''])));

      console.log('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form className="mental-health-form" onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div key={index} className="form-group">
          <label htmlFor={question} className="label">
            {question}
          </label>
          <select
            id={question}
            name={question}
            value={formData[question]}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Select an option</option>
            {options[index].map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default MentalHealthForm;
