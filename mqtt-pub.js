const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log('✅ Publisher connected');

  const payload = {
    temperature: 23.5,
    humidity: 45,
    timestamp: new Date().toISOString(),
  };

  setTimeout(() => {
    client.publish('sensor/data', JSON.stringify(payload), () => {
      console.log('📤 Message published!');
      client.end(true);
    });
  }, 1000);
});

client.on('error', (err) => {
  console.error('❌ MQTT publish error:', err.message);
});
