/*

  eval.ts

  @author Emery Berger <emery@cs.umass.edu> http://www.emeryberger.com

*/

/// <reference path="./jquery.d.ts" />

/*
/// <reference path="./typescript/jquery.d.ts" />
/// <reference path="./typescript/papaparse.d.ts" />
/// <reference path="./typescript/set.d.ts" />
/// <reference path="./typescript/d3.d.ts" />
/// <reference path="./typescript/d3pie.d.ts" />
/// <reference path="./typescript/navigo.d.ts" />
*/

declare function escape(s:string): string;
declare function unescape(s:string): string;

interface ChecklistItem {
    readonly name    : string;
    readonly include : string;
    readonly figure  : string;
    readonly desc    : string;
    readonly notes   : string;
};

interface ChecklistGroup {
    readonly name    : string;
    readonly keyword : string;
    readonly color   : string;
    readonly items   : Array<ChecklistItem>;
};

class EmpiricalEval {

    constructor() {
	EmpiricalEval.theInstance = this;
	jQuery.getJSON("eval.json", function(json) {
	    let s : string = "";
	    s += "<h1>" + json.title + "</h1>";
	    s += "<h3>" + json.credits + "</h3>";
	    s += "<h4>" + json.date + "</h4>";
	    const g = json.groups as Array<ChecklistGroup>;
	    s += "<table width='500'>";
	    for (let i of g) {
		s += "<tr>";
		s += "<td style='color:";
		// Ad hoc: black text for light background colors.
		if (i.color === "PaleGreen") {
		    s += "black";
		} else {
		    s += "white";
		}
		s += ";' bgcolor='"
		    + i.color
		    + "' colspan='2'><font size='+1'><input type='checkbox'>&nbsp;"
		    + i.name + "<br />&nbsp;<br /></font></td></tr>";
		const items = i.items as Array<ChecklistItem>;
		for (let item of items) {
		    if (item.include === "yes") {
			s += "<tr style='background-color:" + i.color + ";'>";
			s += "<td>";
			s += "<img align='middle' height='100' width='100' src='" + item.figure + "'>";
			s += "</td><td>";
			s += "<b>" + item.name + "</b><br />";
			s += item.desc + "<br /><br />";
			s += "</td></tr>";
		    }
		}
		s += "<tr><td>&nbsp;</td></tr>";
	    }
 	    s += "</table>";
	    jQuery("#checklist").html(s);
	});
    }

    private static theInstance : EmpiricalEval; // singleton for this object
    
/*	for (let position = 0; position < this.areaMap.length; position++) {
	    const { area, title }      = this.areaMap[position];
	    CSRankings.areas[position] = area;
	    this.areaNames[position]   = title;
	    this.fields[position]      = area;
	    this.areaDict[area]        = this.areaNames[position];
	    this.areaPosition[area]    = position;
	}
	for (let area of this.aiAreas) {
	    this.aiFields.push (this.areaPosition[area]);
	}
	for (let area of this.systemsAreas) {
	    this.systemsFields.push (this.areaPosition[area]);
	}
	for (let area of this.theoryAreas) {
	    this.theoryFields.push (this.areaPosition[area]);
	}
	for (let area of this.interdisciplinaryAreas) {
	    this.otherFields.push (this.areaPosition[area]);
	}
	for (let child in CSRankings.parentMap) {
	    let parent = CSRankings.parentMap[child];
	    if (!(parent in CSRankings.childMap)) {
		CSRankings.childMap[parent] = [child];
	    } else {
		CSRankings.childMap[parent].push(child);
	    }
	}
	this.displayProgress(1);
	this.loadAliases(this.aliases, ()=> {
	    this.loadTuring(this.turing, ()=> {
		this.displayProgress(2);
		this.loadAuthorInfo(()=> {
		    this.displayProgress(3);
		    this.loadAuthors(()=> {
			this.setAllOn();
			this.navigoRouter.on({
			    '/index' : this.navigation,
			    '/fromyear/:fromyear/toyear/:toyear/index' : this.navigation
			}).resolve();
			this.displayProgress(4);
			this.loadCountryInfo(this.countryInfo, ()=> {
			    setTimeout(()=> {
				this.addListeners();
				CSRankings.geoCheck();
			    }, 0);
			});
		    });
		});
	    });
	});
*/

    /*
    private addListeners() : void {
    
	["toyear", "fromyear", "regions"].forEach((key)=> {
	    const widget = document.getElementById(key);
	    widget!.addEventListener("change", ()=> { this.rank(); });
	});
	// Add listeners for clicks on area widgets (left side of screen)
	// e.g., 'ai'
	for (let position = 0; position < CSRankings.areas.length; position++) {
	    let area = CSRankings.areas[position];
	    if (!(area in CSRankings.parentMap)) {
		// Not a child.
		const widget = document.getElementById(area+'-widget');
		widget!.addEventListener("click", ()=> {
		    this.toggleConferences(area);
		});
	    }
	}
	// Initialize callbacks for area checkboxes.
	for (let i = 0; i < this.fields.length; i++) {
	    const str = 'input[name='+this.fields[i]+']';
	    const field = this.fields[i];
	    jQuery(str).click(()=>{
		let updateURL : boolean = true;
		if (field in CSRankings.parentMap) {
		    // Child:
		    // If any child is on, activate the parent.
		    // If all are off, deactivate parent.
		    updateURL = false;
		    let parent = CSRankings.parentMap[field];
		    const strparent = 'input[name='+parent+']';
		    let anyChecked = 0;
		    let allChecked = 1;
		    CSRankings.childMap[parent].forEach((k)=> {
			let val = jQuery('input[name='+k+']').prop('checked');
			anyChecked |= val;
			// allChcked means all top tier conferences
			// are on and all next tier conferences are
			// off.
			if (!(k in CSRankings.nextTier)) {
			    // All need to be on.
			    allChecked &= val;
			} else {
			    // All need to be off.
			    allChecked &= val ? 0 : 1;
			}
		    });
		    // Activate parent if any checked.
		    jQuery(strparent).prop('checked', anyChecked);
		    // Mark the parent as disabled unless all are checked.
		    if (!anyChecked || allChecked) {
			jQuery(strparent).prop('disabled', false);
		    }
		    if (anyChecked && !allChecked) {
			jQuery(strparent).prop('disabled', true);
		    }
		} else {
		    // Parent: activate or deactivate all children.
		    let val = jQuery(str).prop('checked');
		    if (field in CSRankings.childMap) {
			for (let child of CSRankings.childMap[field]) {
			    const strchild = 'input[name='+child+']';
			    if (!(child in CSRankings.nextTier)) {
				jQuery(strchild).prop('checked', val);
			    } else {
				// Always deactivate next tier conferences.
				jQuery(strchild).prop('checked', false);
			    }
			}
		    }
		}
		this.rank(updateURL);
	    });
	}
	// Add group selectors.
	const listeners : {[key : string] : ()=>void } =
	    { 'all_areas_on'  : (()=> { this.activateAll(); }),
	      'all_areas_off' : (()=> { this.activateNone(); }),
	      'ai_areas_on'   : (()=> { this.activateAI(); }),
	      'ai_areas_off'  : (()=> { this.deactivateAI(); }),
	      'systems_areas_on'   : (()=> { this.activateSystems(); }),
	      'systems_areas_off'  : (()=> { this.deactivateSystems(); }),
	      'theory_areas_on'    : (()=> { this.activateTheory(); }),
	      'theory_areas_off'   : (()=> { this.deactivateTheory(); }),
	      'other_areas_on'     : (()=> { this.activateOthers(); }),
	      'other_areas_off'    : (()=> { this.deactivateOthers(); })
	    };
	for (let item in listeners) {
	    const widget = document.getElementById(item);
	    widget!.addEventListener("click", ()=> {
		listeners[item]();
	    });
	}
	
    */
}

var ev : EmpiricalEval = new EmpiricalEval();
