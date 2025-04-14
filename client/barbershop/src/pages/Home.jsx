import React, { useState, useEffect } from 'react';
import { BarberCard } from '../components/BarberCard';
import { AppointmentForm } from '../components/AppointmentForm';

export const Home = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBarberId, setSelectedBarberId] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    fetch('/api/barbers')
      .then(res => res.json())
      .then(data => {
        setBarbers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching barbers:', error);
        setLoading(false);
      });
  }, []);

  const handleBookAppointment = (barberId) => {
    setSelectedBarberId(barberId);
    setShowAppointmentForm(true);
  };

  const handleAppointmentSubmit = async (data) => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to book appointment');

      setShowAppointmentForm(false);
      // You might want to show a success message here
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle error (show error message)
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Expert Barbers</h1>
        <p className="mt-2 text-lg text-gray-600">Book your next haircut with our professional team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map(barber => (
          <BarberCard
            key={barber.id}
            barber={barber}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </div>

      {showAppointmentForm && selectedBarberId && (
        <AppointmentForm
          barberId={selectedBarberId}
          onSubmit={handleAppointmentSubmit}
          onClose={() => setShowAppointmentForm(false)}
        />
      )}
    </div>
  );
};