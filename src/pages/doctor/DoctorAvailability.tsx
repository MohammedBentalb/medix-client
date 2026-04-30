import { useState } from 'react'
import { ClockIcon, CalendarIcon, PlusIcon, Trash2Icon, CheckCircle2Icon, ArrowLeftIcon} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../../lib/axios/api'
import useAuth from '../../hooks/useAuth'
import { DarkBanner } from '../../components/DarkBanner'
import type { DayAvailability } from '../../types'
import { AVAILABILITY_DAYS } from '../../constants/Constant'

export function DoctorAvailability() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [bookingWindow, setBookingWindow] = useState<number>(1)
  const [consultDuration, setConsultDuration] = useState<number>(30)
  const [availability, setAvailability] = useState<DayAvailability[]>(
    AVAILABILITY_DAYS.map((day) => ({
      day, enabled: true,
      slots: [{ id: Math.random().toString(36).substring(2, 9), start: '09:00', end: '17:00' }]
    }))
  )

  const { mutate: saveSchedule, isPending, isSuccess } = useMutation({
    mutationFn: async (body: object) => {
      const res = await api.put(`/doctors/${user!.id}/schedule`, body)
      return res.data
    },
    onSuccess: () => toast.success('Schedule saved'),
    onError: () => toast.error('Failed to save schedule'),
  })

  const toggleDay = (index: number) => {
    const newAvailability = [...availability]
    newAvailability[index].enabled = !newAvailability[index].enabled
    setAvailability(newAvailability)
  }

  const addSlot = (dayIndex: number) => {
    const newAvailability = [...availability]
    newAvailability[dayIndex].slots.push({
      id: Math.random().toString(36).substring(2, 9),start: '09:00', end: '17:00'
    })
    setAvailability(newAvailability)
  }

  const removeSlot = (dayIndex: number, slotId: string) => {
    const newAvailability = [...availability]
    newAvailability[dayIndex].slots = newAvailability[dayIndex].slots.filter((s) => s.id !== slotId)
    if (newAvailability[dayIndex].slots.length === 0) newAvailability[dayIndex].enabled = false
    setAvailability(newAvailability)
  }

  const updateSlot = (dayIndex: number, slotId: string, field: 'start' | 'end', value: string) => {
    const newAvailability = [...availability]
    const slot = newAvailability[dayIndex].slots.find((s) => s.id === slotId)
    if (slot) slot[field] = value
    setAvailability(newAvailability)
  }

  const buildTemplates = (data: DayAvailability[]) => {
    return data.flatMap((day, i) =>
      day.enabled ? day.slots.map(slot => ({ dayOfWeek: i, startTime: slot.start, endTime: slot.end })) : []
    )
  }

  const handleSave = () => {
    saveSchedule({
      slotDurationMinutes: consultDuration,
      bookingWindowDays: bookingWindow * 30,
      templates: buildTemplates(availability),
    })
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <DarkBanner className="h-80">
        <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 w-full flex flex-col gap-6">
          <div className="flex flex-col items-start gap-4">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-white transition-colors w-fit"
            >
                <ArrowLeftIcon size={16} />
                Back to dashboard
            </button>

            <div className="flex items-center gap-4 mt-2">
              <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center shrink-0 border-2 border-brand-500 shadow-md">
                <span className="text-xl font-jakarta font-bold text-brand-600">
                  SC
                </span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-jakarta font-bold text-white mb-1">
                  Availability Settings
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-stone-300 text-sm">
                  <span className="font-semibold text-brand-400">Dr. Sarah Chen</span>
                  <span className="text-stone-600">•</span>
                  <span className="flex items-center gap-1"><ClockIcon size={14}/> HeartCare Medical Center</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DarkBanner>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="w-full" >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-100">
            <h2 className="text-xl md:text-2xl font-jakarta font-bold text-stone-900">
              Configure Availability
            </h2>
            
            <div className="flex items-center gap-4 text-xs font-bold text-stone-500 bg-stone-50 px-4 py-2 rounded-lg border border-stone-100 shrink-0 overflow-x-auto w-full md:w-auto uppercase tracking-widest">
              <span>MONDAY — SATURDAY</span>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">1</span>
                Patient Booking Window
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2].map((month) => (
                    <button
                        key={month}
                        onClick={() => setBookingWindow(month)}
                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${bookingWindow === month ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-stone-200 bg-white hover:border-brand-300'}`}
                    >
                        <CalendarIcon size={20} className={bookingWindow === month ? 'text-brand-600' : 'text-stone-400'} />
                        <div>
                            <p className={`text-sm font-bold mb-0.5 ${bookingWindow === month ? 'text-brand-900' : 'text-stone-900'}`}>
                                {month} Month{month > 1 ? 's' : ''}
                            </p>
                            <p className={`text-xs ${bookingWindow === month ? 'text-brand-700' : 'text-stone-500'}`}>
                                Patients can book up to {month} month{month > 1 ? 's' : ''} in advance.
                            </p>
                        </div>
                    </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">2</span>
                Consultation Duration
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[15, 30, 45, 60].map((min) => (
                    <button
                        key={min}
                        onClick={() => setConsultDuration(min)}
                        className={`py-3 rounded-xl text-sm font-bold border transition-all ${consultDuration === min ? 'bg-brand-600 border-brand-600 text-white shadow-md' : 'bg-white border-stone-200 text-stone-600 hover:border-brand-300'}`}
                    >
                        {min} Min
                    </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center">3</span>
                Weekly Schedule
              </h3>
              
              <div className="space-y-4">
                {availability.map((dayData, dayIndex) => (
                  <div 
                    key={dayData.day}
                    className={`rounded-xl border transition-all ${dayData.enabled ? 'border-stone-200 bg-white' : 'border-stone-100 bg-stone-50/50'}`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${dayData.enabled ? 'bg-brand-600 text-white' : 'bg-stone-200 text-stone-400'}`}>
                                {dayData.day.substring(0, 3).toUpperCase()}
                            </div>
                            <h4 className="text-sm font-bold text-stone-900">{dayData.day}</h4>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleDay(dayIndex)}
                                className={`w-10 h-5 rounded-full relative transition-colors ${dayData.enabled ? 'bg-emerald-500' : 'bg-stone-300'}`}
                            >
                                <div className="absolute top-1 w-3 h-3 bg-white rounded-full"/>
                            </button>
                            {dayData.enabled && (
                                <button 
                                    onClick={() => addSlot(dayIndex)}
                                    className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200"
                                >
                                  <PlusIcon size={16} />
                                </button>
                            )}
                        </div>
                      </div>

                      {dayData.enabled && (
                        <div className="mt-4 space-y-2">
                          {dayData.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-100">
                              <div className="flex-1">
                                <input 
                                    type="time" 
                                    value={slot.start}
                                    onChange={(e) => updateSlot(dayIndex, slot.id, 'start', e.target.value)}
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 outline-none"
                                />
                              </div>
                              <span className="text-stone-300">—</span>
                              <div className="flex-1">
                                <input 
                                    type="time" 
                                    value={slot.end}
                                    onChange={(e) => updateSlot(dayIndex, slot.id, 'end', e.target.value)}
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 outline-none"
                                />
                              </div>
                              <button 
                                 onClick={() => removeSlot(dayIndex, slot.id)}
                                 className="text-stone-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2Icon size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100">
              <button
                onClick={handleSave}
                disabled={isPending}
                className={`w-full py-4 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${isSuccess ? 'bg-emerald-500 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'} ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSuccess ? (
                    <><CheckCircle2Icon size={18} /> Settings Saved</>
                ) : isPending ? (
                    <>Saving...</>
                ) : (
                    <>Save Configuration</>
                )}
              </button>
              <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-widest font-medium">
                Syncing with your public profile...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
