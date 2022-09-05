import TransportadoraAdapter from "./adapters/TransportadoraAdapter";
import Correios from "./correios/Correios";
import ICorreios from "./correios/ICorreios";
import Transportadora from "./transportadora/Transportadora";

const transporte: ICorreios = new TransportadoraAdapter(new Transportadora)
transporte.receiveCorreios()
transporte.sendCorreios()