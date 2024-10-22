import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotalPagar } from "./helpers";

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect(() =>{
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  useEffect(() =>{
    // calcular el pago mensual
    setPago(total / meses);
  }, [total]);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange(e){
    setCantidad(+e.target.value)
  }

  function handleClickDecremento(){
    const valor = cantidad - STEP;

    if(valor < MIN) {
      alert('cantidad no valida');
      return;
    }
    setCantidad(valor);
  }

  
  function handleClickIncremento(){
    const valor = cantidad + STEP;

    if(valor > MAX) {
      alert('cantidad no valida');
      return;
    }
    setCantidad(valor);
  }


  return (
      <div className="my-20 max-w-lg mx-auto bg-gray-800 border border-gray-600 shadow-lg px-10 py-5 rounded-lg">
    <Header />
    <div className='flex justify-between my-10'>
      <Button 
        operador ="-"
        fn={handleClickDecremento}
      />
      <Button 
        operador ="+"
        fn={handleClickIncremento}
      />
    </div>

    <input 
      type="range"
      className="w-full h-6 bg-gray-200 accent-green-600 hover:accent-green-600"
      onChange={handleChange}
      min={MIN}
      max={MAX}
      step={STEP}
      value={cantidad}
      />
      <p className='text-center my-5 tex-5xl font-extrabold text-violet-600'>
       {formatearDinero(cantidad)}
      </p>
      <h2 className='text-2xl font-extrabold text-gray-200 text-center'>
        Elige un <span className='text-violet-600'>Plazo</span> a pagar
      </h2>
      <select className='mt-5 w-full p-2 bg-white  rounded-lg text-center
      text-xl font-bold text-gray-500'
      value={meses}
      onChange={ e => setMeses(+e.target.value)}
      >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>
      <div className='my-5 space-y-3 bg-green-500 border border-gray-600 shadow-lg rounded-lg p-5'>
        <h2 className='text-2xl font-extrabold text-gray-200 text-center'>
          Resumen <span className='text-violet-600'>de pagos</span>
        </h2>
        <p className='text-xl text-gray-700 text-center font-bold'>{meses} Meses</p>
        <p className='text-xl text-gray-700 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
        <p className='text-xl text-gray-700 text-center font-bold'>{formatearDinero(pago)} Mensuales</p>
      </div>
   </div>
  )
}

export default App
