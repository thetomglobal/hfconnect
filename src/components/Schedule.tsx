import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import { format, addMonths, startOfMonth } from 'date-fns';

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getNextYearMeetings = () => {
    const meetings = [];
    let date = new Date();
    
    for (let i = 0; i < 12; i++) {
      let meetingDate = startOfMonth(date);
      let day = 8;
      while (new Date(meetingDate.getFullYear(), meetingDate.getMonth(), day).getDay() !== 0) {
        day++;
      }
      meetingDate.setDate(day);
      meetings.push(meetingDate);
      date = addMonths(date, 1);
    }
    return meetings;
  };

  const meetings = getNextYearMeetings();
  const monthsPerPage = 10;
  const totalPages = Math.ceil(meetings.length / monthsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const addToCalendar = (date: Date) => {
    const event = {
      title: 'House Fellowship Meeting',
      description: 'Monthly House Fellowship Meeting at God\'s Chamber Global Ministries',
      location: 'Your assigned fellowship center',
      startDate: format(date, "yyyy-MM-dd'T'17:30:00"),
      endDate: format(date, "yyyy-MM-dd'T'19:30:00"),
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(
      event.location
    )}&dates=${event.startDate.replace(
      /[-:]/g,
      ''
    )}/${event.endDate.replace(/[-:]/g, '')}`;

    window.open(googleCalendarUrl, '_blank');
  };

  const visibleMeetings = meetings.slice(
    currentPage * monthsPerPage,
    (currentPage + 1) * monthsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold text-white mb-8">Fellowship Schedule</h1>
      
      <div className="netflix-card p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="netflix-button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold text-white">
            Upcoming Meetings
          </h2>
          
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="netflix-button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMeetings.map((meeting, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-8 h-8 text-[#E50914]" />
                  <div>
                    <p className="text-xl font-bold text-white">
                      {format(meeting, 'MMMM d, yyyy')}
                    </p>
                    <p className="text-gray-400">5:30 PM</p>
                  </div>
                </div>
                <button
                  onClick={() => addToCalendar(meeting)}
                  className="netflix-button flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden md:inline">Add to Calendar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}