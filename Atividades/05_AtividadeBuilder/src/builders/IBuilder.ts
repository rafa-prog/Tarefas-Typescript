export default interface IBuilder{
    reset(): void
    getSanduiche()
    setSanduicheType(SanduicheType)
    setBread(bread)
    setProtein(protein)
    addSalad(salad)
    addSauce(sauce)
}