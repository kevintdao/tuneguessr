import mongoose from 'mongoose';

const dailySongSchema = new mongoose.Schema({
  name: String,
  artists: Array,
  album: Object,
  answer: String,
  song_id: String,
  url: String,
  date: Date,
});

const DailySong = mongoose.model('daily-song', dailySongSchema);

export default DailySong;
