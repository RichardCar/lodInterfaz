import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../shared/services/request.service';
import { PagerService } from '../../shared/services/pager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  optionsSearch = [
  {
    key:'author',
    value: 'Autor'
  },
  {
    key:'institution',
    value: 'Institución'
  },
  {
    key:'group',
    value: 'Grupo'
  },
  {
    key:'title',
    value: 'Título'
  },
  {
    key:'educationalsubject',
    value: 'Materias'
  },
  {
    key:'subject',
    value: 'P. claves'
  },
  {
    key:'NaN5',
    value: 'Colección'
  },
  {
    key:'NaN6',
    value: 'Subcomunidad'
  },
  {
    key: 'contributor',
    value: 'Contribuyente'
  },
  {
    key: 'dateSubmitted',
    value: 'Fecha (publicación o modificación)'
  },
  {
    key: 'format',
    value: 'Formatos'
  },
  {
    key: 'type',
    value: 'Tipos de recurso'
  },
  {
    key:'audience',
    value: 'Audiencia'
  },
  {
    key:'organization',
    value: 'Organización'
  }];

  optionSel: any = 'any';
  searchText = '';
  filterText = '';
  dataSubscription!: Subscription;
  tableHeaders: string[] = [];
  data: any;
  resources: any;
  filteredResources: any[] = [];
  searched = false;
  loading = false;
  resourceSelected: any;
  seeDataResource = false;
  pager: any = {};
  subtitulo = 'Interfaz de Consulta';


  constructor(private requestService: RequestService,
              private pagerService: PagerService) { }

  ngOnInit(): void {
    this.resourceSelected = null;
    this.optionsSearch.sort((a, b) => {return a.value > b.value && 1 || -1});
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  getResults() {
    this.searched = false;
    this.loading = true;
    this.goBack();
    if (this.optionSel !== 'any') {
      this.queryData(true);
    } else {
      this.queryData();
    }
  }

  queryData(filter = false) {
    let filtroSparql = "";
    const text = this.searchText.trim();
    if ( filter ) {
      switch (this.optionSel) {
        case 'dateSubmitted':
          filtroSparql = `FILTER regex(?${this.optionSel}, "${text }", "i")`
          break;
        case 'date':
          filtroSparql = `FILTER regex(?${this.optionSel}, "${text }", "i")`
          break;
      
        default:
          filtroSparql = `FILTER regex(?${this.optionSel}, "${text }", "i")`

          //filtroSparql = `FILTER (lcase(str(?${this.optionSel})) = lcase(str("${text }")))`
          break;
      }
    }
    const consulta_sparql = "" +
            "PREFIX dct: <http://purl.org/dc/terms/>\n" +
            "PREFIX dcterm: <http://purl.org/dc/terms/>\n" +
            "prefix void: <http://rdfs.org/ns/void#>\n" +
            "prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
            "prefix xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
            "prefix dcterms: <http://purl.org/dc/terms/>\n" +
            "prefix bibo: <http://purl.org/ontology/bibo/>\n" +
            "prefix foaf: <http://xmlns.com/foaf/0.1/>\n" +
            "prefix dc: <http://purl.org/dc/elements/1.1/>\n" +
            "prefix parea: <http://parea.com/parea#>\n" +
            "prefix dspace: <http://digital-repositories.org/ontologies/dspace/0.1.0#>\n" +
            "prefix lrmi: <http://purl.org/dcx/lrmi-terms/>\n" +
            "prefix aiiso: <http://vocab.org/aiiso/schema#>\n" +
            "SELECT *\n" +
            "WHERE {\n" +
            "  GRAPH ?graph {\n" +
            "    ?resource dcterms:title ?title .\n" +
            "     OPTIONAL {?resource dcterms:creator ?author} .\n" +
            "     OPTIONAL {?resource dc:creator ?creator} .\n" +
            "     OPTIONAL {?resource dcterms:date ?date} .\n" +
            "     OPTIONAL {?resource dcterms:alternative ?alternative} .\n" +
            "     OPTIONAL {?resource bibo:uri ?uri} .\n" +
            "     OPTIONAL {?resource dcterms:created ?created} .\n" +
            "     OPTIONAL {?resource dc:advisor ?advisor} .\n" +
            "     OPTIONAL {?resource dc:publisher ?publisher} .\n" +
            "     OPTIONAL {?resource dcterms:bibliographicCitation ?bibCitation} .\n" +
            "     OPTIONAL {?resource dcterms:isPartOf ?partof} .\n" +
            "     OPTIONAL {?resource bibo:doi ?doi} .\n" +
            "     OPTIONAL {?resource bibo:isbn ?isbn} .\n" +
            "     OPTIONAL {?resource bibo:issn ?issn} .\n" +
            "     OPTIONAL {?resource bibo:sici ?sici} .\n" +
            "     OPTIONAL {?resource dc:type ?type} .\n" +
            "     OPTIONAL {?resource dc:language ?language} .\n" +
            "     OPTIONAL {?resource dc:subject ?subject} .\n" +
            "     OPTIONAL {?resource dcterms:abstract ?abstract} .\n" +
            "     OPTIONAL {?resource dc:sponsorship ?sponsorship} .\n" +
            "     OPTIONAL {?resource dcterms:description ?description} .\n" +
            "     OPTIONAL {?resource dcterms:issued ?issued} .\n" +
            "     OPTIONAL {?resource dcterms:available ?available} .\n" +
            "     OPTIONAL {?resource dcterms:hasVersion ?hasVersion} .\n" +
            "     OPTIONAL {?resource dcterms:modified ?modified} .\n" +
            "     OPTIONAL {?resource dc:format ?format} .\n" +
            "     OPTIONAL {?resource dcterms:requires ?requires} .\n" +
            "     OPTIONAL {?resource parea:minimunversion ?minimunversion} .\n" +
            "     OPTIONAL {?resource parea:interactivitylevel ?interactivitylevel} .\n" +
            "     OPTIONAL {?resource lrmi:interactivitytype ?interactivitytype} .\n" +
            "     OPTIONAL {?resource dc:rights ?rights} .\n" +
            "     OPTIONAL {?resource dcterms:rights ?rightsUri} .\n" +
            "     OPTIONAL {?resource dcterms:dateCopyrighted ?dateCopyrighted} .\n" +
            "     OPTIONAL {?resource parea:rightscost ?rightscost} .\n" +
            "     OPTIONAL {?resource dcterms:audience ?audience} .\n" +
            "     OPTIONAL {?resource lrmi:typicalagerange ?typicalagerange} .\n" +
            "     OPTIONAL {?resource dcterms:educationlevel ?educationlevel} .\n" +
            "     OPTIONAL {?resource parea:annotationentity ?annotationentity} .\n" +
            "     OPTIONAL {?resource parea:annotationdesc ?annotationdesc} .\n" +
            "     OPTIONAL {?resource foaf:organization ?organization} .\n" +
            "     OPTIONAL {?resource foaf:group ?group} .\n" +
            "     OPTIONAL {?resource lrmi:educationalsubject ?educationalsubject} .\n" +
            "     OPTIONAL {?resource aiiso:knowledgegrouping ?knowledgegrouping} .\n" +
            "     OPTIONAL {?resource aiiso:course ?course} .\n" +
            "     OPTIONAL {?resource aiiso:division ?division} .\n" +
            "     OPTIONAL {?resource aiiso:institution ?institution} .\n" +
            "     OPTIONAL {?resource dcterms:contributor ?contributor} .\n" +
            "     OPTIONAL {?resource dcterms:dateSubmitted ?dateSubmitted} .\n" +
            "     " + filtroSparql + "\n" +
            "   } } ORDER BY ASC(?resource)";
    let body = 'query=' + encodeURIComponent(consulta_sparql);
    this.dataSubscription = this.requestService.getResources(body).subscribe( (res:any) => {
      if (res.results.bindings.length > 0) {
        this.data = res;
        this.resources = this.mergeResources(res);
        this.setPage(1);
        this.filteredResources = this.resources.results.bindings.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.searched = true;
      } else {
        this.data = null;
        this.resources = null;
        this.searched = true;
        this.filteredResources = [];
      }
      this.loading = false;
    }, error => {
      this.searched = true;
      this.loading = false;
      console.error('Error consultando recursos', error);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.resources.results.bindings.length, page);
    // get current page of items
    this.filteredResources = this.resources.results.bindings.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  mergeResources(response: any) {
    let temp: any = response;

    temp.results.bindings.map( (item: any, index: number) => {
      let fila_ordenada: any = {};
      temp.head.vars.map( (header: any) => {
        if(!(header in item)) {
          item[header] = {
            type: 'literal',
            value: '---------'
          };
        }
      });
      Object.keys(item).sort().forEach((key) => {
        fila_ordenada[key] = item[key];
      });
      temp.results.bindings[index] = fila_ordenada;
    });
    temp.head.vars.sort();
    let aux_fila: any = { 'resource': { 'value': '' } };
    let new_bindings:any[] = [];

    //Unificando registros que hacen parte del mismo recurso
    temp.results.bindings.map( (item: any) => {
      if (aux_fila['resource']['value'] == item.resource.value) {
        for (let key of Object.keys(item)) {
          if (!aux_fila[key]['value'].includes(item[key]['value'])) {
              aux_fila[key]['value'] = aux_fila[key]['value'] + ' - ' + item[key]['value']
          }
        }
      } else {
        if (aux_fila.resource.value != '') {
          new_bindings.push(aux_fila)
        }
        aux_fila = item;
      }
    });
    new_bindings.push(aux_fila)
    temp.results.bindings = new_bindings
    return temp;    
  }

  seeResource(resource: any) {
    this.resourceSelected = resource;
    this.seeDataResource = true;
  }

  goBack() {
    this.resourceSelected = null;
    this.seeDataResource = false;
  }

  filter(e: any) {
    console.log(e);
    if (e.target.value.trim() !== '') {
      let filter_array = [];
      for (let item of this.resources.results.bindings) {
          let elementos_fila = Object.values(item);
          let verificado = false;
          elementos_fila.forEach( (child: any) => {
            if (child.value.toLowerCase().includes(e.target.value.toLowerCase())) {
              verificado = true;
            }
          });  
          if (verificado) {
            filter_array.push(item)
          }
      }
      this.setPage(1);
      this.filteredResources = filter_array; 
    } else if(e.target.value.trim() === '') {
      this.filteredResources = this.resources.results.bindings;
    }
    
  }

  isHyperlink(item: any) {
    if (item.value.type === 'uri' || ['contributor', 'resource', 'rightsuri', 'organization', 'division', 'uri', 'annotationentity'].includes(item.key)) {
      return true
    }
    return false;
  }

  filterChanged() {
    if (this.optionSel === 'any') {
      this.searchText = '';
    }
    return;
  }

}
