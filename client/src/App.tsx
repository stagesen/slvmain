import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Facilities from "@/pages/Facilities";
import FacilityDetails from "@/pages/FacilityDetails";
import CityDetails from "@/pages/CityDetails";
import Resources from "@/pages/Resources";
import Quiz from "@/pages/Quiz";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AIAssistant from "@/pages/AIAssistant";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/facilities" component={Facilities} />
          <Route path="/facilities/:slug" component={FacilityDetails} />
          <Route path="/cities/:slug" component={CityDetails} />
          <Route path="/resources" component={Resources} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/ai-assistant" component={AIAssistant} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
