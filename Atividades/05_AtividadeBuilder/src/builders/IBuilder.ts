export default interface IBuilder{
    reset(): void
    getSanduiche()
    setSanduiche(SanduicheType)
    setBread(bread)
    setProtein(protein)
    addSalad(salad)
    addSauce(sauce)
}