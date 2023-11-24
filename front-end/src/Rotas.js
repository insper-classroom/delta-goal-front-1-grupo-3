

function Rotas() {
  return (
    <div className="wrapper"> 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/time" element={<Time />} />
        <Route path="/partidas" element={<Partidas />} />
      </Routes>
    </Router>
  </div>
    );
}

export default Rotas;