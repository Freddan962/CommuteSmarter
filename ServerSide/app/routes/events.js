module.exports = function(app, db) {
    app.post('/api/events',(req, res) => {
        const event = {
            id: events.length + 1,
            color: req.body.color,
            location: req.body.location,
            coordinates: req.body.coordinates,
            titel:req.body.titel
        };
        events.push(event);
        res.json(event);
    });

    const events = [
        {id: 1, color:'red', location: 'Torsgatan', coordinates: {lat: 54566456, long:5677998},titel:'Obstacle',},
        {id: 2, color:'orange', location: 'Kungsgatan',coordinates: {lat: 54566456, long:5677998},titel:'closed for Marathon'},
        {id: 3, color:'blue', location: 'Odengatan',coordinates: {lat: 54566456, long:5677998},titel:'emergency response vehicle'},
    ];

    app.get('/api/events', (req, res) => {
        res.json(events);
    });

    app.get('/api/events/:id', (req, res) => {
        //res.send(req.query);
        const event = events.find(c => c.id === parseInt(req.params.id));
        if (!event) res.status(404).send('The event with given ID was not found.');
        res.json(event);
    });
}