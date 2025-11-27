export interface Influencer {
  id: string;
  name: string;
  photo: string;
  city: string;
  niche: string;
  bio: string;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  followers: string;
  reach: string;
  restrictions?: string;
  price_client: string;
  price_copart: string;
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

export const influencers: Influencer[] = [
  {
    id: '1',
    name: 'Ana Silva',
    photo: '/api/placeholder/400/400', // Placeholder
    city: 'São Paulo, SP',
    niche: 'Beleza',
    bio: 'Especialista em maquiagem artística e skincare, trazendo dicas práticas para o dia a dia.',
    gender: 'Feminino',
    followers: '150k',
    reach: '450k',
    restrictions: 'Não divulga jogos de azar',
    price_client: 'R$ 2.500,00',
    price_copart: 'R$ 1.200,00',
    socials: {
      instagram: '@anasilva.beauty',
      tiktok: '@anasilva.makeup'
    }
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    photo: '/api/placeholder/400/400',
    city: 'Goiânia, GO',
    niche: 'Agro',
    bio: 'Mostrando a rotina do campo e as tecnologias do agronegócio moderno.',
    gender: 'Masculino',
    followers: '85k',
    reach: '200k',
    price_client: 'R$ 3.000,00',
    price_copart: 'R$ 1.500,00',
    socials: {
      instagram: '@carlos.agro',
      youtube: 'Carlos do Campo'
    }
  },
  {
    id: '3',
    name: 'Júlia Costa',
    photo: '/api/placeholder/400/400',
    city: 'Rio de Janeiro, RJ',
    niche: 'Fitness',
    bio: 'Treinos em casa e alimentação saudável para quem tem rotina corrida.',
    gender: 'Feminino',
    followers: '320k',
    reach: '900k',
    restrictions: 'Apenas marcas cruelty-free',
    price_client: 'R$ 4.500,00',
    price_copart: 'R$ 2.000,00',
    socials: {
      instagram: '@ju.fitness',
      tiktok: '@jutreinos'
    }
  },
  {
    id: '4',
    name: 'Pedro Rocha',
    photo: '/api/placeholder/400/400',
    city: 'Belo Horizonte, MG',
    niche: 'Música',
    bio: 'Cantor sertanejo e compositor, compartilhando bastidores e covers.',
    gender: 'Masculino',
    followers: '45k',
    reach: '120k',
    price_client: 'R$ 1.800,00',
    price_copart: 'R$ 800,00',
    socials: {
      instagram: '@pedro.music',
      youtube: 'Pedro Rocha Oficial'
    }
  },
  {
    id: '5',
    name: 'Mariana Oliveira',
    photo: '/api/placeholder/400/400',
    city: 'Curitiba, PR',
    niche: 'Moda',
    bio: 'Dicas de estilo e tendências acessíveis para todos os corpos.',
    gender: 'Feminino',
    followers: '210k',
    reach: '600k',
    price_client: 'R$ 3.200,00',
    price_copart: 'R$ 1.600,00',
    socials: {
      instagram: '@mari.style'
    }
  },
  {
    id: '6',
    name: 'Lucas Ferreira',
    photo: '/api/placeholder/400/400',
    city: 'Salvador, BA',
    niche: 'Tecnologia',
    bio: 'Reviews de gadgets e tutoriais de programação para iniciantes.',
    gender: 'Masculino',
    followers: '120k',
    reach: '350k',
    restrictions: 'Não faz publi de dropshipping duvidoso',
    price_client: 'R$ 2.800,00',
    price_copart: 'R$ 1.400,00',
    socials: {
      instagram: '@lucastech',
      youtube: 'Canal do Lucas'
    }
  }
];


