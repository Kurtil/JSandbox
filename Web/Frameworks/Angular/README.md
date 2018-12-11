# LevelUP - Angular basics

You write Angular applications by composing HTML templates with Angularized markup, writing component classes to manage those templates, adding application logic in services, and boxing components and services in modules.

### Data Binding

The followings are to add to the 'template' file (.html) :
- `{{}}` : Angular's interpolation **binding** syntax.
- `[]` : The interpolation is a simple form for **[property]="expression"** where property is textContent. This synthax allow you to access a DOM property. If the value is not dynamic, it is possible to write directly **property='value'**. It is also possible to mix **[property]="expression + 'nonDynamicText'"**.
- `()` : To capture evenements **(event)='statement(s)'**. Combo are allowed for keyboard press like keydown.alt.space
- `[()]` : Angular's **two-way binding** syntax. *You must import FormsModule from @angular/forms to use it. Import it in the module where you want to use it then add it in the @NgModul imports statement.*
```html
<input name="username" [(ngModel)]="user.username">
<!-- is syntaxical suger for -->
<input name="username" [ngModel]="user.username" (ngModelChange)="user.username =
$event">
```

NB : expression are evaluated during each detection change cycle while statements will be evaluated only when event is emitted. The different binding (event vs property) are so very different!

During each detection change cycles, Angular will look inside composant instance AND **local variable** declare with a **#** in the template :
```html
<input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
```
#### Canonical version
```html
<ns-pony [name]="pony.name"></ns-pony>
<!-- Can be writted -->
<ns-pony bind-name="pony.name"></ns-pony>
```
```html
<button (click)="onButtonClick()">Click me!</button>
<!-- Can be writted -->
<button on-click="onButtonClick()">Click me!</button>
```
```html
<input type="text" #name>
<button (click)="name.focus()">Focus the input</button>
<!-- Can be writted -->
<input type="text" ref-name>
<button on-click="name.focus()">Focus the input</button>
```

### Built-in Structural Directives

To put inside html elements :
- **\*ngIf**="boolean". *The element and its children will be displayed if true, hidden otherwise.* There is also else :
```html
  <div \*ngIf="races.length > 0; else empty">
    <h2>Races</h2>
  </div>
  <ng-template #empty>
    <h2>No races.</h2>
  </ng-template>
```
- **\*ngFor**="let i of list" inside a balise.*The \* indicate that this balise and its children are the master template.* This is a simpler form for :
```html
  <ul>
    <ng-template ngFor let-race [ngForOf]="races">
      <li>{{ race.name }}\</li>
    </ng-template>
  </ul>
```
To get the index : \*ngFor="let race of races; **index as i**". This is an exported variable, like **odd**, **even**, **last**, **first**...

nb : if you pu an observable into the \*ngFor, you will have to pipe it with async like this :
```javascript
*ngFor="let i of list | async"
```
The \*ngFor can't do anything with an Observable until you route it through the async pipe (AsyncPipe). The async pipe subscribes to the Observable and produces the array to \*ngFor.

- **\*ngSwitch**
```html
<div [ngSwitch]="messageCount">
  <p *ngSwitchCase="0">You have no message\</p>
  <p *ngSwitchCase="1">You have a message\</p>
  <p *ngSwitchDefault>You have some messages\</p>
</div>
```

### Built-in Standard Directives

- **ngStyle** :

```html
<p [style.color]="boolean expression">Friendship is Magic</p>
```
To change multiple style :
```html
<div [ngStyle]="{fontWeight: fontWeight, color: color}">I've got style</div>
```
This directive take an object were keys are in camelCase (fontWeight) or dash-case ('font-weight').

- **ngClass**

```html
<div [class.awesome-div]="boolean expression">I've got style</div>
```
To change multiple classes :
```html
<div [ngClass]="{'awesome-div': isAnAwesomeDiv(), 'colored-div': isAColoredDiv()}"
>I've got style</div>
```

### Using Injectable services

To properly use a service, create a service and then put it inside the constructor as a private property. The service must be registered as provider inside module or component providers property.
The providers array tells Angular to create a fresh instance of the service when it create the component or the module.

To configure mock service for developpement and test :

```javascript
// in our module
providers: [
  ApiService,
  { provide: RaceService, useClass: IS_PROD ? RaceService : FakeRaceService }
]
```
Or with useFactory and useValue
```javascript
// in our module
providers: [
  ApiService,
  // we provide a factory
  { provide: 'IS_PROD', useValue: true },
  {
    provide: RaceService,
    useFactory: (IS_PROD, apiService) => IS_PROD ? new RaceService(apiService) : new FakeRaceService(),
    deps: ['IS_PROD', ApiService]
  }
]
```
NB : there is not only one injectors. There is one injector for the root module and one injector per component. You can add providers inside component decorator. Then, injectors inherit from root injector. Angular first look at current injector and then through the root injector.

### Directives

Directives add behaviours to DOM elements. Directive must have css selector to indicate when Angular must activate it.

Selectors must be of different kind :
- element ex: footer
- class ex .alert
- attribute ex [color]
- attribute with value ex [color=red]
- a combination like footer[color=red], an element footer with an color attribute with the value red. [color],footer.alert, an elemnt with color attribute or (,) a footer element ith .alert class. footer:not(.alert), an element footer without the .alert classe.

Inputs to directives :

```javascript
@Directive({
selector: '[loggable]',
inputs: ['text: logText']
})
export class SimpleTextDirective {

  set text(value) {
      console.log(value);
  }
}
```
This directive bind the DOM logText prperty on the text property of the Directive instance. If the instance property doesnt exist, it is created and each time there is modification, the property will be updated. The setter in the example will be called at each modification.

In the inputs, you can write only one DOM property if you want your instance property to have the same name :

```javascript
@Directive({
selector: '[loggable]',
inputs: ['logText']
})
export class SameNameInputDirective {
  set logText(value) {
    console.log(value);
  }
}
```
But you will probably use more often the syntax with the **@input** :

```javascript
@Directive({
selector: '[loggable]'
})
export class InputDecoratorDirective {
  @Input('logText') text: string;
}
```
or with the same name :
```javascript
@Directive({
selector: '[loggable]'
})
export class SameNameInputDecoratorDirective {
  @Input() logText: string;
}
```
and if you want a setter :
```javascript
@Directive({
selector: '[loggable]'
})
export class SameNameInputDecoratorOnSetterDirective {
  @Input()
  set logText(value) {
      console.log(value);
  }
}
```
In the same way, there is **@output** for outputs :
```javascript
@Output()
anything = new EventEmitter<any>();

onButtonClicked() {
  this.anything.emit(this.property)
}
```
See the *Reactive Programming* part for more information about the event emitter!

#### Life cycle

Inputs are not evaluated in the constructor ! That is why you need to use :
- ngOnChanges() called first after each changes. It get a map with previous and new value of bindings, in a SimpleChange.
```javascript
@Input() pony: string;

ngOnChanges(changes: SimpleChanges) {
  const ponyValue = changes['pony'];
  console.log(`changed from ${ponyValue.previousValue} to ${ponyValue.currentValue}
    `);
  console.log(`is it the first change? ${ponyValue.isFirstChange()}`);
}
```
- ngOnInit() called only once, after the first change.
- ngOnDestroy() called when component is destroy.
- some other for more advanced check ... cf documentation

### components

Components are directives with 2 attributes more, not mandatory, and MUST have an associated view. ViewProviders is used when you want to used specific providers for the component, but not for its children.
The url for the template is simple thanks to webpack that allow you to do not write the relative path from the root of the application ;)

#### CSS and encapsulation

Cascading style sheet means that styles will cascade on chil elements. But Angular allow different behaviours. You can add different value to the encapsulation attribute of the component decorator :
- ViewEncapsulation.Emulated (default). Behaviour similar to Native but without ShadowDOM (emulated ^^).
- ViewEncapsulation.Native. Work with shadow dom, not implemented in every browser!
- ViewEncapsulation.None. No encapsulation.

#### View queries

It is possible to get local variable declared in template (with #) in the code :

```javascrip
// template
<input #loginInput name="login" [(ngModel)]="credentials.login" required>
// component
@ViewChild('loginInput') private loginInput: ElementRef;
// or another element
@ViewChild(NgForm) credentialsForm: NgForm;
```

There is also ViewChildren that get many elements in a QueryList with some usefull attributes :
- first : the first element that satisfy the request
- last
- length
- changes : an Observable that emit a new QueryList every time an element that satisfy the request is add / del / moved.

```javascript
@ViewChildren(PonyComponent) ponies: QueryList<PonyComponent>;
```

QueryList also provides many methodes toArray(), map(), filter(), find()…

#### Content
To get html from parent, you can use ng-content with selecteur if you want many input:
```html
<!-- template for the children -->
<div class="card">
  <div class="card-block">
    <h4 class="card-title">
      <ng-content select=".title"></ng-content>
    </h4>
    <p class="card-text">
      <ng-content select=".content"></ng-content>
    </p>
  </div>
</div>

<!-- Template for the parent -->
<ns-card>
  <p class="title">Card <strong>title</strong></p>
  <p class="content">Some quick <strong>example</strong> text</p>
</ns-card>
```
#### ContentChild

When using ng-content, the projected content is not catchable by @viewchild. You have to use ContentChild or ContentChildren to get it.

```javascript
@ContentChildren(TabDirective) tabs: QueryList<TabDirective>;
```
see NS doc for a good example

#### HostListener

The next example is a directive that listen to the dbl click of the host element ! Thanks to the HostListener decorator
```javascript
@Directive({
  selector: '[nsInputClear]'
})
export class InputClearDirective {
  constructor(private element: ElementRef) {}
  @HostListener('dblclick')
  clearContent() {
    this.element.nativeElement.value = '';
  }
}
```
or another for global events : (with event that is get with the second parameter of the decorator)

```javascript
export class WindowResizeDirective {
  @HostListener('window:resize', ['$event'])
  resize(event) {
    console.log(`The screen is being resized to ${event.target.innerWidth}`);
  }
}
```
#### HostBinding

Although HostListener allows interaction with host events, HostBinding allows interactions with host properties!
```javascript
@Directive({
  selector: '[nsAddClassIfRequired]'
})
export class AddClassIfRequiredDirective {
  constructor(private control: NgControl) {}
  @HostBinding('class.is-required')
  get isRequired() {
    return this.control.hasError('required');
  }
} // For more advanced utilisations ... :P see NS doc for more details
```

Note : to inject an optional dependencie : @Optionnal() private ... in the constructor :)

### Tests

#### Unitary Tests

##### Karma

Karma is an Angular team tool taht allow to run test in browser and rerun when files changes ;)

##### Jasmine

Jasmine is a library that allow to write unitary test. Jasmine coulb de resume with this methodes :
- describe() describe a test suite
- it() declare a test
- except() declare an assert. Could de followed by toBe(), toBeGreaterThan(), toBeUndefined() ... and negation could be also tested by addin .not in front of it :
```javascript
describe('My first test suite', () => {
  it('should construct a Pony', () => {
    const pony = new Pony('Rainbow Dash', 10);
    expect(pony.name).toBe('Rainbow Dash');
    expect(pony.speed).not.toBe(1);
    expect(pony.isFasterThan(8)).toBe(true);
  });
});
```
Tips : adding 'f' in front of describe of it (fdescribe or fit) will execute on ly this suite or test. Adding an x will excluse this suite or test (xdescribe or xit).

The methode beforeEach() will initialize a context before each test. There is also afterEach()...

You can also spy oject methodes :

```javascript
describe('My first test suite with spyOn', () => {
  let pony: Pony;
  beforeEach(() => {
      pony = new Pony('Rainbow Dash', 10);
      // define a spied method
      spyOn(pony, 'isFasterThan').and.returnValue(true);
  });
  it('should test if the Pony is fast', () => {
    const runPonyRun = pony.isFasterThan(60);
    expect(runPonyRun).toBe(true); // as the spied method always returns
    expect(pony.isFasterThan).toHaveBeenCalled();
    expect(pony.isFasterThan).toHaveBeenCalledWith(60);
  });
});
```

##### Jasmine Inside Angular
###### Testing serives
To use injection dependence inside unitary test, Angular proposed the get methode of the class TestBed. It is possible to put this methode in a beforeEach() for more clarity.

```javascript
import { TestBed } from '@angular/core/testing';
describe('RaceService', () => {
  let service: RaceService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RaceService]
  }));
  beforeEach(() => service = TestBed.get(RaceService));
  it('should return races when list() is called', () => {
    expect(service.list().length).toBe(2);
  });
});
```
Do not forget to declare the injector in the configureTestingModule() before calling it with get().

Also, you can test asynchrone services

```javascript
import { async, TestBed } from '@angular/core/testing';
describe('RaceService', () => {
  let service: RaceService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RaceService]
  }));
  beforeEach(() => service = TestBed.get(RaceService));
  it('should return a promise of 2 races', async(() => {
    service.list().then(races => {
      expect(races.length).toBe(2);
    });
  }));
});
```
Thanks to dependency injection, it is possible to use mock/fack services :

```javascript
import { TestBed } from '@angular/core/testing';
describe('RaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: LocalStorageService, useClass: FakeLocalStorage },
      RaceService
    ]
  }));
  it('should return 2 races from localStorage', () => {
    const service = TestBed.get(RaceService);
    const races = service.list();
    expect(races.length).toBe(2);
  });
}
```

But Jasmine can help you to declare mock service ;)

```javascript
import { TestBed } from '@angular/core/testing';
describe('RaceService', () => {
  const localStorage = jasmine.createSpyObj('LocalStorageService', ['get']);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
    { provide: LocalStorageService, useValue: localStorage },
    RaceService
    ]
  }));
  it('should return 2 races from localStorage', () => {
    localStorage.get.and.returnValue([{ name: 'Lyon' }, { name: 'London' }]);
    const service = TestBed.get(RaceService);
    const races = service.list();
    expect(races.length).toBe(2);
    expect(localStorage.get).toHaveBeenCalledWith('races');
  });
});
```
###### Testing components

ComponentFixture returned by TestBed methode createComponent is a representation of the component. Generaly, test follows the architecture "Given/When/Then".
- Given : context (component instantiation)
- When : manually triggered change detection !!! (in test, detection change is user made)
- Then : with assertions. We can get DOM element and check for event too

```javascript
it('should emit an event on click', () => {
  TestBed.configureTestingModule({
    declarations: [PonyComponent]
  });
  const fixture = TestBed.createComponent(PonyComponent);
  // given a pony
  const ponyComponent = fixture.componentInstance;
  ponyComponent.pony = { name: 'Rainbow Dash', color: 'BLUE' };
  // we fake the event emitter with a spy
  spyOn(ponyComponent.ponyClicked, 'emit');
  // when we click on the pony
  const element = fixture.nativeElement;
  const image = element.querySelector('img');
  image.dispatchEvent(new Event('click'));
  // and we trigger the change detection
  fixture.detectChanges();
  // then the event emitter should have fired an event
  expect(ponyComponent.ponyClicked.emit).toHaveBeenCalled();
});
```
It is also possible to overite some component part (all that is available insible @Component decorator)

```javascript
TestBed.overrideComponent(RaceComponent, { set: { template: '<h2>{{ race.name }}</h2>' } });
// because template is the most commonly used, Angular 4 introduced :
TestBed.overrideTemplate(RaceComponent, '<h2>{{ race.name }}</h2>');
```
to be called before create component.

#### End-To-End Tests

The tool is Protactor, but the 'language' is still jasmine ! :P

```javascript
describe('Home', () => {
  it('should display title, tagline and logo', () => {
    browser.get('/');
    expect(element.all(by.css('img')).count()).toEqual(1);
    expect($('h1').getText()).toContain('PonyRacer');
    expect($('small').getText()).toBe('Always a pleasure to bet on ponies');
  });
});
```
```javascript
    $('h1')
    // is equivalent to :
    element(by.css('h1'))
```
On the returned element of the $(), you can use getText(), getAttribute(), or again click() and sendKeys()...

### Routing

The Angular router is an external, optional Angular NgModule called RouterModule.
To navigate, be sure that \<base href="/"> is put in the head element of the index.html file.

```javascript
//app.route.ts
import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component'
import { HttpClientComponent } from './components/http-client/http-client.component'

export const ROUTES: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'httpclient', component: HttpClientComponent },
  { path: 'encapsulationTest', component: EncapsulationTestComponent }
];
```
Then :
```javascript
//app.module.ts
//...
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.route';
//...
imports: [
  RouterModule.forRoot(ROUTES)
]
```
NB : dont forget to import and add in declarations every component used bu the router in the root module !
Then, the directive router outlet will indicates where to put the component related to the route :

```html
<header>
  <nav>...</nav>
</header>
<main>
  <router-outlet></router-outlet>
  <!-- the component''s template will be inserted here-->
</main>
<footer>made with &lt;3 by Ninja Squad</footer>
```
To navigate, use the routerLink directive :
```html
<a href="" routerLink="/">Home</a>
<!-- same as -->
<a href="" [routerLink]="['/']">Home</a>
```
NB: the / is mandatory if you want to specify path from root of application. Without it, it is a relative path from the current path (that can be usefull for nested path)

To style the current route, use the directive routerLinkActive :
```html
<a href="" routerLink="/" routerLinkActive="selected-menu">Home</a>
```
It is also possible to get a ref to this directive :
```html
<a href="" routerLink="/" routerLinkActive #route="routerLinkActive">Home {{
route.isActive ? '(here)' : '' }}</a>
```
You can also navigate from code after injecting the Router service:
```javascript
this.router.navigate([`${this.path}`])
```
#### Parameterized Route

in the path of the RouterModule, you can put an ":" in front of the part of the path you want to be a parameter, or *token* :

```javascript
  { path: 'routeTest/:params', component: RouteTestComponent }
```
and then :
```javascript
constructor(private route: ActivatedRoute) { }

ngOnInit() {
  this.params = this.route.snapshot.paramMap.get('params');
}
```
But be carrefull, this is an instant version of the route, and the router will use component if he can... If you want to navigate through the same component with different parameters, ngOnInit() will not be called and you will have to use the observable and not the snapshit :

```javascript
this.route.paramMap.subscribe((params: ParamMap) => this.params = params.get('params'))
```
For more advandes use, you can stop previous request if you navigate before the result :
```javascript
ngOnInit() {
  this.route.paramMap
  .map((params: ParamMap) => params.get('ponyId'))
  .switchMap(id => this.ponyService.get(id))
  .subscribe(pony => this.pony = pony);
}
```
The default behaviour of pathmatch is prefix... And the router watch all routes from the first to the last. This means that if you start your routes table by path : '' pathMatch : 'prefix', then every routes will correspond to this one :P

#### Nested Routes

An other <routeur-outlet><.../> can be put to display nested component with children routes :

```javascript
{
  path: 'routeTest/:params', component: RouteTestComponent,
  children:
  [
    { path: '', component: HttpClientComponent }, // this will redirect routeTest/ and routeTest/n/
    { path: 'encapsulationTest', component: EncapsulationTestComponent } // this will redirect routeTest/n/encapsulationTest
  ]
}
```

#### Guards

There is 4 differents Guards :

- CanActivate : can block the activation of a route and as side effect, can redirect to another page(for authentification for example)
- CanActivateChild : can block activation of children routes.
- CanLoad : can be used on a route with a loadChildren attribute, usefull for lazy loading.
- CanDeactivate : can avoid changing route! Uesfull when forms are not fulfilled.

To apply a guard :
```javascript
  { path: 'guard', component: EncapsulationTestComponent, canActivate: [GuardService] },
```

In this example, GuardService should be a service that implements CanActivate :

```javascript
@Injectable()
export class GuardService implements CanActivate {

  constructor(private router: Router, private logginService: LogginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const loggedIn = this.logginService.isLogged();
    if (!loggedIn) {
      this.router.navigate(['/login']); // redirection if not logged
    }
    return loggedIn;
  }
}
```
Nested routes with empty path and guard can be usefull :

```javascript
{ path: 'ponies/:ponyId', component: PonyComponent, canActivate: [LoggedInGuard] },
{ path: 'races', component: RacesComponent, canActivate: [LoggedInGuard] }
```

Can be simplify in :

```javascript
{
  path: '',
  canActivate: [LoggedInGuard],
  children: [
    { path: 'ponies/:ponyId', component: PonyComponent },
    { path: 'races', component: RacesComponent }
  ]
}
```
#### Resolvers

Router navigates to pages as soon as user click on the link, before server respondes. This is great by sometimes this is not what you may want. Is you want to wait for data to be available, use a resolver on a route. It will wait for data (sync or async) to arrive to navigate :

```javascript
@Injectable()
export class RaceResolver implements Resolve<RaceModel> {
  constructor(private raceService: RaceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <RaceModel> | Promise<RaceModel> | RaceModel {
    return this.raceService.get(+route.paramMap.get('raceId'));
  }
}
```

```javascript
{
  path: 'races/:raceId',
  component: RaceComponent,
  resolve: {
    race: RaceResolver
    }
}
```
Here, the data returned by RaceResolver will be socked with the key 'race'. Then, the component can access to this data using this key :

```javascript
export class RaceComponent implements OnInit {
  race: RaceModel;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.race = this.route.snapshot.data['race'];
  }
}
```
If you navigates to the same component but with differents parameters, resolvers and guards will be applyed again and you need to subsribe and use async pipe in template :

```javascript
ngOnInit() {
  this.route.data.subscribe(data => this.race = data['race']);
}
```
On problème of the resolver is if the data loading is long, navigation should appear to be stuck... To solve this problem, you can use routing evenment

#### Routing evenement

Router emit event when navigating. It is possible to get this event by subscribing to the observable "events" of the Router service. Event are of differents type and to get them, use event instanceof NavigationStart. There is different kind :

- NavigationStart (usefull for starting wainting icon)
- NavigationEnd (usefull for ending wainting icon, or sending hit to analytics...)
- NavigationError (resolver send emptydata or error)
- NavigationCancel (Guard avoid navigation)

- RouteConfigLoadStart
- RouteConfigLoadEnd
- RoutesRecognized

- ResolveStart
- ResolveEnd

- GuardsCheckStart
- GuardsCheckEnd

- ChildActivationStart
- ChildActivationEnd

#### Params and data

It is possible to add parameters and data to routes :

matrix parameters :

```javascript
/races/42;foo=bar;baz=wiz/ponies
```

Matrix parameters will be available only for /races/42 associated component. ponies associated component will not have them

```javascript
router.navigate(['/races', 42, {foo: 'bar', baz: 'wiz'}, 'ponies']);
// or from template :
<a [routerLink]="['/races', 42, {foo: 'bar', baz: 'wiz'}, 'ponies']">Link</a>
```
query parameters :
```javascript
/races/42/ponies?foo=bar&baz=wiz
```
query parameters will be available for all components.
```javascript
router.navigate(['/races', 42, 'ponies'], { queryParams: {foo: 'bar', 'baz': 'wiz'}});
// or from template
<a [routerLink]="['/races', 42, 'ponies']" [queryParams]="{foo: 'bar', baz: 'wiz'}">Link</a>
```
There is also data that can be added to route (like resolver does) :

```javascript
{
  path: 'races',
  component: RacesComponent,
  data: {
    allowDeletion: false
  }
}
```
#### lazy loading
See doc for more infomartion about bundle (children modules) and lazy loading

```javascript
{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
```
### Forms
Angular allow to write forms in two different ways : code driven or template driven. In any case, the smallest part of a forms is represented in angular by a FormControl. A FormControl have several arguments :

- valid
- invalid
- error
- dirty : false until user modify the field
- pristine : opposite as dirty
- touched : false until user enter in the field
- untouched : ...
- value
- valueChanges : Observable that emits on every changes on the field
There is also some methodes like hasError() that can be used to test some kind of error. Example : .hasError('required')
The value passed to the constructor will be the initial value.
```javascript
const password = new FormControl('Cédric');
console.log(password.value); // logs "Cédric"
```
A group of FormControl can be regrouped to form a FormGroup to create a part of a form with same validation rules.
FormGroup have the same property as FormControl but with some differences :

- valid : every control is valid
- invalid
- errors : Objects with errors of the group, null if valid. Each error is composed of a key and the associated value is a tab with each control associated to this error.
- dirty
- pristine
- touched
- untouched
- value : object with key/value (control/value)
- valueChanges
It also has hasError() and a get() methode to get controls.

```javascript
const form = new FormGroup({
  username: new FormControl('Cédric'),
  password: new FormControl()
});
console.log(form.dirty); // logs false until the user enters a value
console.log(form.value); // logs Object {username: "Cédric", password: null}
console.log(form.get('username')); // logs the Control
```
#### Template Driven Form
Directives will be added to form tag to change it into the angular version of the form ;)
You need to include FormsModule

```html
<h2>Sign up</h2>
<form (ngSubmit)="register(userForm.value)" #userForm="ngForm">
  <div>
    <label>Username : </label>
    <input name="username" ngModel/>
  </div>
  <div>
    <label>Password : </label>
    <input name="password" type="password" ngModel/>
  </div>
  <button type="submit">Register</button>
</form>
```
NOTE :  you have to add name and ngModel directive to let Angulat create FormControls. form tab will create the FormGroup. Then, catch the exported instance directive ngForm that as the same methodes as FormGroup.

#### Code Driven Form
Instead of using new FormControl() and new FormGroup(), we will use a builder class ;) FormBuilder. This class have to be injected to be used:
```javascript
import { FormBuilder } from '@angular/forms';
//...
private userForm: FormGroup;

constructor(fb: FormBuilder) {
  this.userForm = fb.group({
    username: '',
    password: ''
  });
}
```
Then, you link the template to the FormGroup in the component with directive from ReactiveFormsModule :
```html
<h2>Sign up</h2>
<form (ngSubmit)="register()" [formGroup]="userForm"> // for the FormGroup
  <div>
    <label>Username : </label><input formControlName="username"> // for each FormControl
  </div>
  <div>
    <label>Password : </label><input type="password" formControlName="password">
  </div>
  <button type="submit">Register</button>
</form>
```
If you need to change value of the form from the component :
```javascript
reset() {
  this.usernameCtrl.setValue(''); // use the setValue('newValue') methode :)
  this.passwordCtrl.setValue('');
}
```
##### Validation

Validators allow test validation of the form. This will return a map with the errors or null otherwise
- Validators.required
- Validators.minLength(n)
- Validators.maxLength(n)
- Validators.email()
- Validators.pattern(p) (regex p)

```javascript
constructor(fb: FormBuilder) {
  this.userForm = fb.group({
    username: fb.control('', [Validators.required, Validators.minLength(3)]),
    password: fb.control('', Validators.required)
  });
}
```
for template driven forms, just add required, minlength, maxlenght or email directives to input tab.

```html
<label>Username</label><input name="username" ngModel required minlength="3">
```
then :
```html
  <button type="submit" [disabled]="userForm.invalid">Register</button>
```

```html
<div *ngIf="userForm.get('username').hasError('minlength') || userForm.get('username').hasError('required') && userForm.get('username').dirty">
Required and must be 3 car length min
</div>
```
instead of the get, you can declar it in the component and refer it later in the template
```javascript
export class RegisterFormComponent {
  userForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  constructor(fb: FormBuilder) {
    this.usernameCtrl = fb.control('', Validators.required);
    this.passwordCtrl = fb.control('', Validators.required);
    this.userForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    });
}
```
Then
```html
<div *ngIf="usernameCtrl.dirty && usernameCtrl.hasError('required')">Username is
required</div>
```
From template, you can do the same with export directives :

```html
<h2>Sign up</h2>
<form (ngSubmit)="register(userForm.value)" #userForm="ngForm">
  <div>
    <label>Username</label><input name="username" ngModel required #username="ngModel">
    <div *ngIf="username.dirty && username.hasError('required')">Username is required</div>
  </div>
  <div>
    <label>Password</label><input type="password" name="password" ngModel required #password="ngModel">
    <div *ngIf="password.dirty && password.hasError('required')">Password is required</div>
  </div>
  <button type="submit" [disabled]="userForm.invalid">Register</button>
</form>
```
Angular automatically add class to inputs :
```html
<style>
input.ng-invalid.ng-dirty {
  border: 3px red solid;
}
</style>
```
- ng-invalid
- ng-valid
- ng-dirty
- ng-pristine
- ng-touched
- ng-untouched
- ng-pending (in case of async validator, see below)

To create specific validators, create a methode that take a FormControl as parameter, and return an object with the error, or null if valid :) :

```javascript
static isOldEnough = (control: FormControl) => {
// control is a date input, so we can build the Date from the value
const birthDatePlus18 = new Date(control.value);
birthDatePlus18.setFullYear(birthDatePlus18.getFullYear() + 18);
return birthDatePlus18 < new Date() ? null : { tooYoung: true };
};
// Then
this.birthdateCtrl = fb.control('', [Validators.required, RegisterFormComponent.isOldEnough]);
```
And in the template, you can get the errors :
```html
<div *ngIf="birthdateCtrl.hasError('tooYoung')">You''re way too young to be
betting on pony races</div>
```
Async validators :
```javascript
this.usernameCtrl = fb.control('', Validators.required, control => this.isUsernameAvailable(control));
// ...
isUsernameAvailable(control: AbstractControl) {
  const username = control.value;
  return this.userService.isUsernameAvailable(username)
    .map(available => available ? null : { alreadyUsed: true });
}
```
It is possible to regroup FormControl to test them independently and organize the form :
```html
<div formGroupName="passwordForm">
  <!-- The regrouped forms -->
</div>
```
```javascript
passwordForm: FormGroup;
userForm: FormGroup;
usernameCtrl: FormControl;
passwordCtrl: FormControl;
confirmCtrl: FormControl;
static passwordMatch(group: FormGroup) {
  const password = group.get('password').value;
  const confirm = group.get('confirm').value;
  return password === confirm ? null : { matchingError: true };
}
constructor(fb: FormBuilder) {
  this.usernameCtrl = fb.control('', Validators.required);
  this.passwordCtrl = fb.control('', Validators.required);
  this.confirmCtrl = fb.control('', Validators.required);
  this.passwordForm = fb.group(
    { password: this.passwordCtrl, confirm: this.confirmCtrl },
    { validator: RegisterFormComponent.passwordMatch }
  );
  this.userForm = fb.group({ username: this.usernameCtrl, passwordForm: this.passwordForm });
}
```
In this example, a FormGroup is grouped with a FormControl to create the final FormGroup. The validator is called every time one of the field in the form is changed.

The observable valueChanges allow to follow each modifications :

```javascript
// we subscribe to every password change
this.passwordCtrl.valueChanges
// only recompute when the user stops typing for 400ms
.debounceTime(400)
// only recompute if the new value is different than the last
.distinctUntilChanged()
.subscribe(newValue => this.passwordStrength = newValue.length);
```
RxJs debounceTime(400) emits only when user stop tipping for 400ms, and distinctUntilChanged() emits only if the value is different from the previous one.

Angular 5 allow to change the detection cycle of the changes :
- change : default, on value change
- blur : on loose focus
- submit : when parent form is validate

```javascript
this.passwordCtrl = new FormControl('', {
  validators: Validators.required,
  updateOn: 'blur'
});
```
Or on every field
```javascript
this.userForm = new FormGroup({
  username: this.usernameCtrl,
  password: this.passwordCtrl
  }, {
    updateOn: 'blur'
  });
```
Or in template
```html
<input name="username" #usernameCtrl="ngModel" [(ngModel)]="user.username" [ngModelOptions]="{ updateOn: 'blur' }" required>
```
Or globally with ngFormOptions directive (Angular 5)
```html
<form (ngSubmit)="register()" [ngFormOptions]="{ updateOn: 'blur' }"></form>
```
#### Conclusion on forms : simple : template driven. If you need async and custom validators: code driven.

### Pipe

Pipes can be use in interpolation and property binding but not on evenement binding.

```html
<p>{{ ponies | slice:0:2 | json }}</p>
```
```html
<p [textContent]="ponies | json"></p>
```
Pipes can be used on code too via dependencie injection :

```javaScript
import { JsonPipe } from '@angular/common';
...
constructor(jsonPipe: JsonPipe) {
  // Call the transform method on it
  this.poniesAsJson = jsonPipe.transform(this.ponies);
}
```
BUT pipe have to be added in providers of ngModul to be usable in component code !!! (or providers of component...)

Even in ngFor :

```html
<div *ngFor="let pony of ponies | slice:0:2">{{ pony.name }}</div>`
```
or more advanced with variable ("size" not visible because in component.ts) and the result of slice get in variable thanks to "as" :

```html
<div *ngFor="let pony of ponies | slice:0:size as total; index as i">
{{ i+1 }}/{{ total.length }}: {{ pony.name }}
</div>
```

Async pipe allow to get data from Observable or Promise, returning empty string until data is available. If data come from Observable, pipe will unsubscribe from Obrservable when navigating to another page.

```html
<div>{{ asyncGreeting | async }}</div>
```
And more properly with the "as"
```html
<div *ngIf="asyncUser | async as user">{{ user.name }}</div>
```
#### Creating Pipes

Using Angular CLI, all is done ;) for you. Just play with value and args of the implemented transform function. Tips : by default, only one arg is available but you can get all args you want by adding others parameter or using the rest operator :

```javascript
transform(value: any, ...args)
```
### Reactive Programming

This part will detail the main ideas of RxJs

An observable is similar to an array, but with asyncron data
Table :
```javascript
[1, 2, 3, 4, 5]
.map(x => x * 2)
.filter(x => x > 5)
.forEach(x => console.log(x)); // 6, 8, 10
```
Observable :
```javascript
Observable.from([1, 2, 3, 4, 5])
.map(x => x * 2)
.filter(x => x > 5)
.subscribe(x => console.log(x)); // 6, 8, 10
```
To create an Observable :
```javascript
Observable.create(fn)
```
fn is a function that emit event on the parameter with the next methode like :
```javascript
(observer) => observer.next('hello')
```

Then, subscribe on the observable with the methode:
```javascript
.subscribe(fn, error-fn, done-nn)
```
Only the first is mandatory, it will be called on eache event. The second will be called if an error occure. The third when the observable is terminated.

Angular uses Observable and give tool to use it : EventEmitter

```javascript
const emitter = new EventEmitter();
const subscription = emitter.subscribe(
  value => console.log(value),
  error => console.log(error),
  () => console.log('done')
  );

emitter.emit('hello');
emitter.emit('there');
emitter.complete();
subscription.unsubscribe(); // unsubscribe

// logs "hello", then "there", then "done"
```
### Http

The Angular module is :
```javascript
import { HttpClientModule } from '@angular/common/http';
```
Then the http service can be injected :

```javascript
import { HttpClient } from '@angular/common/http';
// ...
constructor(private http: HttpClient) {}

baseUrl: string = 'http://127.0.0.1:8080';

getData() {
  return this.http.get(`${this.baseUrl}/data`)
}
```
If you want the complete response :
```javascript
http.get(`${baseUrl}/api/races`, { observe: 'response' })
  .retry(3) // bonus to retry 3 times if it fails
  .subscribe((response: HttpResponse<Array<RaceModel>>) => {
    console.log(response.status); // logs 200
    console.log(response.headers.keys()); // logs []
});
```
For sendind data :
````javascript
http.post(`${baseUrl}/api/races`, dataToSend)
````
Each http methode take an option object, not mandatory, for configuring request.
- 'params' represents the quesry string :
```javascript
const params = {
  'sort' : 'ascending',
  'len' : '4'
}
http.get(`url`, { params })
```
- headers allows to add custom headers. Usefull for JSON Web Token authentification :
```javascript
const headers = { 'Authorization': `Bearer ${token}` };
http.get(`url`, { headers })
```
#### JSONP
Jsonp allow to not use CORS. Server will not return json directly but encapsulated in a callback function. Because script are not forced to SameOriginPolicy ;).

```javascript
http.jsonp('https://api.github.com/orgs/Ninja-Squad/repos', 'callback')
// extract data
.map((res: { data: Array<any> }) => res.data)
.subscribe(response => {
// will return the public repos of Ninja-Squad
this.repos = response;
});
```

#### Interceptor :

It is possible to intercept some kind of request to modify it specificly in the app. Usefull for error or redirecting ... See doc

#### Testing Http

```javascript
import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('RaceService', () => {
  let raceService: RaceService;
  let http: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [RaceService]
  }));
  beforeEach(() => {
    raceService = TestBed.get(RaceService);
    http = TestBed.get(HttpTestingController);
  });
  it('should return an Observable of 2 races', async(() => {
    // fake response
    const hardcodedRaces = [{ name: 'London' }, { name: 'Lyon' }];
    // call the service
    let actualRaces = [];
    raceService.list().subscribe(races => actualRaces = races);
    // check that the underlying HTTP request was correct
    http.expectOne('/api/races')
    // return the fake response when we receive a request
    .flush(hardcodedRaces);
    // check that the returned array is deserialized as expected
    expect(actualRaces.length).toBe(2);
  }));
});
```
### Zones



### Export statement

The export statement is automaticly added on new classes inside new component or services... But it is also possible to put it on variables to make them possible to import directly to somewhere else. Exemple : mockData.

import {*variableName*} from '*filePath*'

### Naming Style Rules
Exemple for components :
- **Classes** name : UpperCamelCaseComponent
- **Files** name : lower-case.component.ts