export function Newsletter() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Fique por dentro das novidades
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Receba as últimas notícias sobre tecnologia diretamente no seu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Inscrever
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
