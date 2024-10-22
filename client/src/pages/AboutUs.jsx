import React from 'react';
import AntonellaImg from '../assets/Antonella.jpg';
import ArielImg from '../assets/Ariel.jpg';
import VicenImg from '../assets/Vicen.jpg';  
import TotoImg from '../assets/Toto.jpg';    
import CristobalImg from '../assets/Cristobal.jpg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const teamMembers = [
  {
    name: 'Antonella Anabella Diez',
    role: 'Rol',
    description: '...',
    imageUrl: AntonellaImg,
  },
  {
    name: 'Ariel Cristiano',
    role: 'Rol',
    description: '...',
    imageUrl: ArielImg,
  },
  {
    name: 'Manuel Vicente Figuerero Mantilla',
    role: 'Rol',
    description: '...',
    imageUrl: VicenImg,
  },
  {
    name: 'Cristóbal Perez Companc',
    role: 'Rol',
    description: '...',
    imageUrl: CristobalImg, // Cambia esta imagen si tienes la correcta para Cristóbal
  },
  {
    name: 'Tomás Gabriel Muguerza Marino',
    role: 'Rol',
    description: '...',
    imageUrl: TotoImg,
  },
];

const AboutUs = () => {
    return (
      <div className="bg-gradient-to-b from-[#FFFFFF] to-brown-200 min-h-screen py-10">
        {/* Título de la página */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Sobre Nosotros</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Somos un grupo de estudiantes de la <span className="font-semibold">Universidad Argentina de la Empresa (UADE)</span>, de la
            Facultad de Ingeniería y Ciencias Exactas. Este proyecto fue desarrollado como parte de la materia <span className="font-semibold">Seminario de Integración Profesional</span>, bajo la guía del profesor <span className="font-semibold">Vilaboa Pablo</span>.
            Nuestro objetivo fue aplicar nuestros conocimientos en desarrollo de software para facilitar la planificación
            de recetas, basándonos en los ingredientes disponibles en casa.
          </p>
        </div>
  
        {/* Sección del equipo */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden w-64">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mt-4 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Frase final */}
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-800 font-semibold">
            "Este proyecto refleja nuestro esfuerzo por unir tecnología y creatividad en el ámbito culinario."
          </p>
        </div>
  
        {/* Botón de descarga del PDF */}
        <div className="mt-6 flex justify-center">
          <a href="/path-to-your-pdf.pdf" download className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700">
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            Descargar Proyecto en PDF
          </a>
        </div>
      </div>
    );
  };
  
  export default AboutUs;

