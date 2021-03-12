import React from 'react';
import './App.css';
import XLSX from 'xlsx';

function App() {

  var selectedFile :any
  var excel :any
  var doneConvert :boolean = false

  interface anketa {
    ORTOPEDSKA_POMAGALA:[],
    PKZ3_PKZ4:[{
      IME_PREZIME:string,
      GOD_RODENJA:number,
      SRODSTVO:string,
      RAZINA_OBRAZOVANJA:number,
      STRANI_JEZIK:any[],
      MS_WORD:number,
      MS_EXCEL:number,
      MS_POWERPOINT:number,
      SLUZENJE_INTERNETOM:number,
      SLUZENJE_EMAILOM:number,
      DODATNE_RACUNALNE:any[],
      CERTIFIKATI:any[],
      VOZACKI:number,
      DODATNE_VJESTINE:any[],
      KRONICNA_BOLEST:string,
      WHO1:number,
      WHO2:number,
      WHO3:number,
      WHO4:number,
      WHO5:number,
      WHO6:number,
      WHO7:number,
      WHO8:number,
      WHO9:number,
      WHO10:number,
      WHO11:number,
      WHO12:number,
      WHO_2:number,
      WHO_3:number,
      WHO_4:number,
      DASS21_1:number,
      DASS21_2:number,
      DASS21_3:number,
      DASS21_4:number,
      DASS21_5:number,
      DASS21_6:number,
      DASS21_7:number,
      DASS21_8:number,
      DASS21_9:number,
      DASS21_10:number,
      DASS21_11:number,
      DASS21_12:number,
      DASS21_13:number,
      DASS21_14:number,
      DASS21_15:number,
      DASS21_16:number,
      DASS21_17:number,
      DASS21_18:number,
      DASS21_19:number,
      DASS21_20:number,
      DASS21_21:number,
      STR1:string,
      STR2_1:number,
      STR2_2:number,
      STR2_3:number,
      STR2_4:number,
      STR2_5:number,
      ZNANJE:any[],
      TRENUTNI_RADNI_STATUS_ID:null,
      TRENUTNO_ZANIMANJE_ID:null,
      PODJELA_ZANIMANJA_ID:null,
      PRIJAVLJEN_HZZO_ID:null,
      PRIJAVLJEN_HZZO_RAZLOG_ID:null,
      HZZO_BROJ_MJESECI:null,
      TRAZIO_POSAO_ID:null,
      TRAZIO_POSAO_BROJ_PUTA:null,
      POSLODAVCI:[],
      ISHOD_ZADNJEG_OBRACANJA_POSLODAVCU_ID:null,
      RAZLOG_NEOBRACANJA_POSLODAVCU_ID:null,
      KATEGORIJA_POSLOVA_ZELJELI_ID:null,
      ZUPANIJA_ZELJELI_RADITI_ID:null,
      NASELJE_ZELJELI_RADITI_ID:null,
      PREKVALIFIKACIJA_ID:null,
      PITANJE_5P11B_ID:null,
      NEZAINTERESIRAN_PREKVALIFIKACIJA_ID:null,
      NAZIV_TVRTKE:null,
      NAZIV_MJESTA_TVRTKE:null,
      NAZIV_ULICE_TVRTKE:null,
      KUCNI_BROJ_TVRTKE:null,
      RADILI_STRUCI_ID:null,
      NAZIV_STRUKE_ID:null,
      IZNOS_PLACE_ID:null,
      UKUPNO_PRIMANJA_ID:null,
      UGOVOR_O_DOZIVOTNOM_UZDRZAVANJU_ID:null,
      OSOBA_PRIMATE_UZDRZAVANJE_ID:null,
      IZNOS_UZDRZAVANJA_ID:null,
      DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID:null,
      BROJ_OSOBA_UZDRZAVATE:null,
      UZDRZAVANE_OSOBE:[]
  }],
  PKZ5:[],
  PROGRAM_PSIHOPOMOCI:[],
  IME_ZRTVE:null,
  PREZIME_ZRTVE:null,
  OIB:null,SPOL:null,
  DATUM_RODENJA:null,
  NASELJE_RODENJA:null,
  ZUPANIJA_RODENJA:null,
  DRZAVA_RODENJA:null,
  DRZAVLJANSTVO:null,
  PREBIVALISTE:null,
  BORAVISTE:null,
  POSTANSKI_BROJ:null,
  ULICA_STANOVANJA:null,
  FIKSNI:null,
  MOBILNI:null,
  EMAIL:null,
  BRACNO_STANJE:null,
  ZUPANIJA_PREBIVALISTA:null,
  F1_ID:null,
  F2_ID:null,
  IME_PREZIME_ISPUNJAVA:null,
  GOD_RODJENJA_ISPUNJAVA:null,
  SRODSTVO_ID:null,
  BROJ_OSOBA_U_KUCANSTVU:null,
  POSTOJE_UZDRZAVANE_OSOBE:null,
  BROJ_UZDRZAVANIH_OSOBA:null,
  ZUPANIJA_STRADAVANJA_ID:null,
  NASELJE_STRADAVANJA_ID:null,
  LOKACIJA_STRADAVANJA_ID:null,
  PODRUCJE_STRADAVANJA_ID:null,
  DAN_STRADAVANJA:null,
  MJESEC_STRADAVANJA:null,
  GODINA_STRADAVANJA:null,
  VRSTA_STRADAVANJA_ID:null,
  VRSTA_EKSPLOZIVNOG_SREDSTVA_ID:null,
  NAZIV_EKS:null,
  OZNAKA_EKS:null,
  STUPANJ_TJELESNOG_OSTECENJA_ID:null,
  DODATNI_OPIS_OZLJEDE:null,
  ZDRAVSTVENO_STANJE_PROMJENE_ID:null,
  ZDRAVSTVENO_STANJE_PROMJENE_OPIS:null,
  DIJAGNOZA_ID:null,
  VRSTA_ZANIMANJA_ID:null,
  MJESTO_STRADAVANJA_SUMNJIVO_ID:null,
  POSTUPAK_NAKNADA_STETE_ID:null,
  POSTUPAK_NAKNADA_STETE_NACIN_ID:null,
  FAZA_NAKNADE_STETE_ID:null,
  ISHOD_POSTUPKA_NAKNADE_STETE_ID:null,
  POSTUPAK_RADNE_SPOSOBNOSTI_ID:null,
  OCJENA_RADNE_SPOSOBNOSTI_ID:null,
  POTREBNA_TUDJA_POMOC_ID:null,
  POMOC_DRUGE_OSOBE_SASTOJI:null,
  TJEDNO_SATI_POMOC_ID:null,
  KORISNIK_DOPLATKA_ZA_POMOC_ID:null,
  KORISTITE_ORTOPEDSKO_POMAGALO_ID:null,
  PRAVO_PROFESIONALNE_REHABILITACIJE_ID:null,
  KAKVO_PRAVO_PROFESIONALNE_REH:null,
  FIZIKALNA_TERAPIJA_ID:null,
  SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID:null,
  POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID:null,
  NAKNADA_TJELESNOG_OSTECENJA_ID:null,
  POSTOTAK_TJELESNOG_OSTECENJA:null,
  IZNOS_NAKNADE_TJELESNOG_OSTECENJA:null,
  NAKNADA_DATUM_OD:null,
  NAKNADA_DATUM_DO:null,
  KORISNIK_INVALIDSKE_MIROVINE_ID:null,
  RAZLOG_INVALIDSKE_MIROVINE_ID:null,
  IZNOS_INVALIDSKE_MIROVINE:null,
  SOCIO_POTPORE_ID:null,
  INSTITUCIJA_POTPORA:null,
  SOCIO_FINANCIRANO_ID:null,
  SUSTAV_JAVNOG_OBRAZOVANJA:null,
  JAVNO_ZDRAVSTVO:null,
  POLICIJA:null,
  CENTRI_ZA_SOCIJALNU_SKRB:null,
  ZAVODI_ZA_ZAPOSLJAVANJE:null,
  JAVNI_SPORTSKI_SADRZAJI:null,
  KULTURNE_USTANOVE:null,
  JAVNI_PREVOZI:null,
  DOSTUPNOST_INTERNETA:null,
  DOSTUPNOST_TRGOVINA:null,
  KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA:null,
  KORISTI_JAVNO_ZDRAVSTVO:null,
  KORISTI_POLICIJA:null,
  KORISTI_CENTRI_ZA_SOCIJALNU_SKRB:null,
  KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE:null,
  KORISTI_JAVNI_SPORTSKI_SADRZAJI:null,
  KORISTI_KULTURNE_USTANOVE:null,
  KORISTI_JAVNI_PREVOZI:null,
  KORISTI_DOSTUPNOST_INTERNETA:null,
  PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA:null,
  PRIJEDLOG_JAVNO_ZDRAVSTVO:null,
  PRIJEDLOG_POLICIJA:null,
  PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB:null,
  PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE:null,
  PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI:null,
  PRIJEDLOG_KULTURNE_USTANOVE:null,
  PRIJEDLOG_JAVNI_PREVOZI:null,
  PRIJEDLOG_DOSTUPNOST_INTERNETA:null,
  PRIJEDLOG_DOSTUPNOST_TRGOVINA:null,
  USLUGE_NEDOSTUPNE_ID:null,
  RAZLOG_NEDOSTUPNE_USLUGE:null,
  SUDJELUJETE_DRUGA_USLUGA_ID:null,
  NAZIV_DRUGE_USLUGE:null,
  OBITELJ_MIROVINA_ID:null,
  IZNOS_OBITELJSKE_MIROVINE_ID:null,
  RAZLOG_OBITELJSKE_MIROVINE_ID:null,
  OBITELJ_DRUGA_PRAVA_ID:null,
  OBITELJ_OSTVARILA_PRAVA_ID:null,
  OBITELJ_DRUGA_PRAVA_RAZLOG:number
  }

  var objektAnketa :anketa;

  const selectFile = (e:any) => {
    selectedFile=e.target.files[0]
    console.log(`FILE ${selectedFile.name} UPLOADED`)
  }

  const convertExcelToJSON = () => {
    if(selectedFile)
    {
      console.log("DATA FOUND")
      var fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (e:any) =>{
        console.log("FILE READER LOADED")
        var data = e.target.result;
        var workbook = XLSX.read(data,{type:"binary"})
        workbook.SheetNames.forEach(sheet => {

          console.log("CREATING OBJECT")
          let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          let jsonObject = JSON.parse(JSON.stringify(rowObject))
          excel = jsonObject[0]
          console.log(jsonObject)
          doneConvert = true
          console.log("OBJECT CREATED")

        })   
      }
    }
    else
    {
      console.log("NO DATA")
    }
  }

  const parseData = () => {

  }

  return (
    <div className="App">
      <div className="naslovInput">
        <header>CONVERT EXCEL TO JSON</header>
      </div>
      <hr/>
      <div className="uploadInput">
        <input type="file"  id="fileUpload" onChange={(e)=>selectFile(e)} accept=".xls,.xlsx"/>
      </div>
      <hr/>
      <div className="convertInput">
        <button type="button" onClick={(e)=>convertExcelToJSON()}>CONVERT</button>
      </div>
      <hr/>
      <div className="parseInput">
        <button type="button" onClick={()=>parseData()}>PARSE</button>
      </div>
      <hr/>
      <div className="logInput">
        <button type="button" onClick={()=>doneConvert?console.log(excel):console.log("CONVERT NOT FINISHED")}>OBJEKT</button>
      </div>
    </div>
  );
}

export default App;
