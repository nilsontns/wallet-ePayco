import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import Header from '../components/header';
import { useState } from 'react';
import podium from '../components/podium';
import Podium from '../components/podium';

interface EventCategory {
    name: '4tiempo' | '2tiempo' | 'altacilindrada';
    pilots: number;
}

interface EventData {
    id: string;
    title: string;
    date: string; // formato ISO
    location: {
        lat: number;
        lng: number;
    };
    description: string;
    categories: EventCategory[];
    prizes: {
        first: string;
        second: string;
        third: string;
    };
    isPrivate: boolean;
}


type Place = 1 | 2 | 3;

interface Winner {
    place: Place;
    name: string;
    prize: string;
}


export function DetailsEvent() {
    const [selectedCategory, setSelectedCategory] = useState('4tiempo');

    const podiumWinners: Winner[] = [
        { place: 2, name: '', prize: 'Medalla + $150' },
        { place: 1, name: '', prize: 'Trofeo + $300' },
        { place: 3, name: '', prize: 'Diploma' }
    ];



    const selectedEvent = {
        title: "Freestyle Show",
        date: "2024-07-13T00:00:00Z",
        location: { lat: 10.4891, lng: -66.8792 },
        description: "Evento de motos con múltiples categorías.",
        isPrivate: false,
        categories: [
            {
                name: "4tiempo",
                pilots: [
                    {
                        name: "Carlos Pérez", bike: "Yamaha FZ-25",
                        image: "https://link-a-foto.com/piloto1.jpg" // opcional
                    },
                    { name: "Luis Soto", bike: "Honda XR150" },
                    { name: "Joel García", bike: "Suzuki GN125" },
                    { name: "Pedro López", bike: "Yamaha Fazer" },
                    { name: "Andrés Mendoza", bike: "Bajaj Pulsar 180" },
                    { name: "José Ramírez", bike: "Keeway RKV 200" },
                    { name: "Rafael Salas", bike: "TVS Apache RTR" },
                    { name: "Henry Díaz", bike: "Honda CB190R" },
                    { name: "Miguel Torres", bike: "Suzuki Gixxer" },
                    { name: "Freddy Romero", bike: "Bera BRZ 200" }
                ],
                prizes: {
                    first: "Trofeo + $200",
                    second: "Medalla + $100",
                    third: "Diploma"
                }
            },
            {
                name: "2tiempo",
                pilots: [
                    { name: "Daniel Vivas", bike: "Yamaha DT175" },
                    { name: "Jorge Pinto", bike: "Suzuki AX100" },
                    { name: "Carlos Romero", bike: "Kawasaki KDX200" },
                    { name: "Randy Pérez", bike: "Honda CR125" },
                    { name: "Gabriel Rivas", bike: "Yamaha RX115" },
                    { name: "Juan Barreto", bike: "Suzuki TS125" },
                    { name: "Luis Gil", bike: "Yamaha RD135" },
                    { name: "Jesús Camacho", bike: "Bajaj Boxer 100" },
                    { name: "Manuel Suárez", bike: "Honda MTX125" },
                    { name: "Ricardo Salcedo", bike: "Yamaha DT125" }
                ],
                prizes: {
                    first: "Trofeo + $150",
                    second: "Medalla + $75",
                    third: "Diploma"
                }
            },
            {
                name: "altacilindrada",
                pilots: [
                    { name: "Eduardo León", bike: "Yamaha MT-07" },
                    { name: "Alfredo Moreno", bike: "KTM Duke 390" },
                    { name: "Victor Zambrano", bike: "Kawasaki Ninja 400" },
                    { name: "Enrique Vargas", bike: "BMW G 310 R" },
                    { name: "Héctor Blanco", bike: "Suzuki GSX-R600" },
                    { name: "Omar Peña", bike: "Ducati Monster 797" },
                    { name: "Jhonny Figueroa", bike: "Yamaha R3" },
                    { name: "Ramón Paredes", bike: "Honda CBR500R" },
                    { name: "Leonardo Farías", bike: "CFMOTO 300NK" },
                    { name: "Yorman Durán", bike: "Benelli 302S" }
                ],
                prizes: {
                    first: "Trofeo + $300",
                    second: "Medalla + $150",
                    third: "Diploma"
                }
            }
        ]
    };

    const currentCategory = selectedEvent.categories.find(cat => cat.name === selectedCategory);

    const goTo = () => {
        // Aquí puedes implementar la lógica para redirigir al usuario a la página de asistencia
        console.log(`Asistiendo al evento: ${selectedEvent.title} en la categoría: ${selectedCategory}`);
    };

    return (
        <Box>
            <Header title="Detalle del Evento" showBackArrow />

            <Box sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight="bold">{selectedEvent.title}</Typography>
                <Typography color="text.secondary" mb={2}>
                    {new Date(selectedEvent.date).toLocaleDateString()}
                </Typography>
                <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>Privacidad</Typography>
                    <Typography>{selectedEvent.isPrivate ? 'Privado' : 'Público'}</Typography>
                </Box>


                {/* MAPA */}
                <Box sx={{ height: 200, backgroundColor: '#ccc', borderRadius: 2, mb: 2 }}>
                    {/* Aquí iría tu <MapComponent center={selectedEvent.location} /> */}
                </Box>

                <Typography variant="body1" mb={2}>{selectedEvent.description}</Typography>

                {/* SELECT DE CATEGORÍA */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Categoría"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {selectedEvent.categories.map((cat) => (
                            <MenuItem key={cat.name} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box>
                    <Button
                        onClick={goTo}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Asistir
                    </Button>
                </Box>

                {/* INFO DE LA CATEGORÍA SELECCIONADA */}
                {currentCategory && (
                    <>
                        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                            Pilotos de {currentCategory.name}
                        </Typography>
                        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {currentCategory.pilots.map((pilot, index) => (
                                <Box
                                    key={index}
                                    onClick={() => console.log('Participante:', pilot)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#f9f9f9',
                                        borderRadius: 2,
                                        p: 1.5,
                                        boxShadow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            backgroundColor: '#ddd',
                                            mr: 2,
                                        }}
                                    >
                                        {/* Reemplaza src por pilot.image si tienes URL real */}
                                        <img
                                            src={pilot?.image || 'https://via.placeholder.com/50'}
                                            alt={pilot.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>

                                    <Box>
                                        <Typography fontWeight="bold">{pilot.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {pilot.bike}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>


                        <Typography variant="subtitle1" fontWeight="bold">Premios</Typography>
                        {/* <Typography>🥇 {currentCategory.prizes.first}</Typography>
                        <Typography>🥈 {currentCategory.prizes.second}</Typography>
                        <Typography>🥉 {currentCategory.prizes.third}</Typography> */}



                    </>
                )}


                <Podium winners={podiumWinners} />
            </Box>
        </Box>
    );
}


export default DetailsEvent;
