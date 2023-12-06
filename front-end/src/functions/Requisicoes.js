import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token');

export const fetchDestaques = async (teamName) => {
    try {
      const response = await fetch(`https://sprint-deltago-5179309dcfcb.herokuapp.com/rupturas_jogadores/jogo/Palmeiras x Red Bull Bragantino/time/${teamName}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        redirect: 'follow',
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Erro ao buscar destaques: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Erro na requisição: ${error.message}`);
    }
  };

export const fetchDesfechos = async (teamName) => {
  try {
    const response = await fetch(`https://sprint-deltago-5179309dcfcb.herokuapp.com/rupturas_grafico/jogo/Palmeiras x Red Bull Bragantino/time/${teamName}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      redirect: 'follow',
    });
    if (response.ok) {
      const jsonData = await response.json();
      const data = [["Desfecho", "Quantidade"]]; // Make sure the header matches what you want to display

      // Assuming jsonData is an object like the one you provided:
      // {
      //   "Bem-Sucedido": 3,
      //   "Bloqueado": 4,
      //   "Perdido": 2
      // }
      
      // Iterate over each key-value pair in the jsonData object
      for (const [key, value] of Object.entries(jsonData)) {
        // Push the key-value pair as an array into your data array
        data.push([key, value]);
      }

      return data;
      } else {
        throw new Error(`Erro ao buscar destaques: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Erro na requisição: ${error.message}`);
    }
  };

export const fetchLances = async (teamName) => {
    try {
        const response = await fetch(`https://sprint-deltago-5179309dcfcb.herokuapp.com/rupturas_lista/jogo/Palmeiras x Red Bull Bragantino/time/${teamName}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        redirect: 'follow',
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Erro ao buscar destaques: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Erro na requisição: ${error.message}`);
    }
  };

export const fetchLancesCruzamentos = async (teamName) => {
  try {
      const response = await fetch(`https://sprint-deltago-5179309dcfcb.herokuapp.com/cruzamentos_jogadores/jogo/Palmeiras x Red Bull Bragantino/time/${teamName}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      redirect: 'follow',
    });
    if (response.ok) {
      const JsonData = await response.json();
      const data = [["jogadores", "cruzamentos"]];

      JsonData.jogadores.forEach((jogador) => {
        data.push([jogador.nome, jogador.cruzamentos]);
      }); 
      return data;
      
    } else {
      throw new Error(`Erro ao buscar destaques: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Erro na requisição: ${error.message}`);
  }
};

export const fetchDestaquesCruzamentos = async (teamName) => {
  try {
      const response = await fetch(`https://sprint-deltago-5179309dcfcb.herokuapp.com/cruzamentos_jogadores/jogo/Palmeiras x Red Bull Bragantino/time/${teamName}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      redirect: 'follow',
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erro ao buscar destaques: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Erro na requisição: ${error.message}`);
  }
}

export const fetchCruzamentos = async (teamName) => {
  try {
      const response = await fetch(`https://sprint-deltago-5179309dcfcb.herokuapp.com/cruzamentos_lista/jogo/Palmeiras x Red Bull Bragantino/time/${teamName}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      redirect: 'follow',
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erro ao buscar destaques: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Erro na requisição: ${error.message}`);
  }
}