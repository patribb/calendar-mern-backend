import Event from '../models/event-model.js';

export const createEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
      event.user = req.uid;
      const eventSaved = await event.save();
      res.status(201).json(eventSaved);
    } catch (error) {
      console.log(error);
      res.status(500).json({ok: false, msg: 'Upsss, algo salió mal...'})
    }
}

export const getEvents = async (req, res) => {
  const events = await Event.find().populate('user', 'name')
  res.status(200).json(events);
}

export const updateEvent = async (req, res) => {
  const { user, ...others } = req.body;
  const {id} = req.params;
  const uid = req.uid
  try {
    const event = await Event.findByIdAndUpdate(id, others, {new: true});
    if(!event) {
     return res.status(400).json({msg: 'Evento no encontrado'})
    }
    if(event.user.toString() !== uid) {
      return res.json({msg: 'Solo puedes modificar tus eventos'});
    }
    const eventUpdated = event.save();
    res.status(200).json({ok: true, events: eventUpdated})
  } catch (error) {
    console.log(error);
    res.status(500).json({ok: false, msg: 'Algo salió mal...'})
  }
}

export const deleteEvent = async (req, res) => {
  const {id} = req.params;
  const uid = req.uid
  try {
    const event = await Event.findByIdAndDelete(id);
    if(!event) return res.status(400).json({msg: 'Evento no encontrado'})
    if(event.user.toString() !== uid)  return res.json({msg: 'Solo puedes eliminar tus eventos'});
    res.status(200).json({ok: true, msg: 'Evento eliminado'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ok: false, msg: 'Algo salió mal...'})
  }
}