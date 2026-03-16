const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
      <Icon className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
      {title}
    </h3>
    <p className="text-muted-foreground mb-6">{description}</p>
    {action}
  </div>
);

export default EmptyState;
