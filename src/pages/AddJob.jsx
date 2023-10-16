import { useState } from 'react';
import { statusOptions, typeOptions } from '../constants';
import axios from 'axios';
import { addNewJob } from '../redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    id: new Date().getTime(),
    position: '',
    company: '',
    location: '',
    status: 'interview',
    type: 'full-time',
    date: new Date().toLocaleDateString(),
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      !formState.position ||
      !formState.company ||
      !formState.location
    ) {
      toast.warn('Please fill in all fields.');
      return;
    }
    // Send to API
    axios
      .post('http://localhost:3060/jobs', formState)
      .then(() => {
        dispatch(addNewJob(formState));
        // Redirect the user to the home page.
        navigate('/');
        toast.success('Added Successfully.');
      }) 
      // Send to store
      .catch((err) => console.log(err));
  };

  return (
    <section className="add-sec">
      <h2>Add New Job</h2>
      <form onSubmit={handleAdd}>
        <div className="input-field">
          <label>Position</label>
          <input
            type="text"
            onChange={(e) =>
              setFormState({
                ...formState,
                position: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <label>Company</label>
          <input
            type="text"
            onChange={(e) =>
              setFormState({
                ...formState,
                company: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <label>Location</label>
          <input
            type="text"
            onChange={(e) =>
              setFormState({
                ...formState,
                location: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <label>Status</label>
          <select
            onChange={(e) =>
              setFormState({
                ...formState,
                status: e.target.value,
              })
            }
          >
            {statusOptions.map((opt) => (
              <option value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="input-field">
          <label>Type</label>
          <select
            type="text"
            onChange={(e) =>
              setFormState({
                ...formState,
                type: e.target.value,
              })
            }
          >
          
            {typeOptions.map((opt) => (
              <option value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button>Add</button>
      </form>
    </section>
  );
};

export default AddJob;